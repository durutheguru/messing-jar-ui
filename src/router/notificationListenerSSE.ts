import { EventTrigger } from "@/components/core/Event";
import { Log, Util, Web } from "@/components/util";
import "@/services/events/ProfileDetailsUpdateListener";
import pinia from "@/store";

import sseTokenStore from "@/store/modules/sseToken";
import { LocalDateTime, ZonedDateTime } from "@js-joda/core";

function attachEventSourceHandlers(evtSource: EventSource) {
    evtSource.onmessage = function (message: any) {
        try {
            Log.info(`Message received. Data: ${JSON.stringify(message.data)}`);
            const item = JSON.parse(message.data);
            EventTrigger.trigger(item.event, message.data);
        } catch (ex) {
            Log.error('Error occurred: ' + ex)
        }
    };

    evtSource.onopen = function (event) {
        Log.info("SSE Connection is Open...");
    };

    evtSource.onerror = function () {
        Log.info("Error in SSE Connection...");
    };
}

export default async function (to: any, from: any) {
    try {
        const tokenStore = sseTokenStore(pinia);
        const now = LocalDateTime.now();
        let fetchToken = false;

        if (Util.isValidString(tokenStore.getExpiry)) {
            const expiryDate = LocalDateTime.parse(tokenStore.getExpiry);
            if (expiryDate.isBefore(now)) {
                fetchToken = true;
            }
        } else {
            fetchToken = true;
        }

        let token = "";
        if (fetchToken) {
            const response = await Web.getAbsoluteAsync(
                import.meta.env.VITE_PUSH_NOTIFICATIONS_BASE_URL +
                "/events-streams/v1/notifications/token"
            );

            Log.info(`SSEvents Token Response: ${JSON.stringify(response.data)}`);

            const tokenResponse = response.data;
            tokenStore.setTokenData(tokenResponse);

            token = tokenResponse.token;
        } else {
            token = tokenStore.getToken;
        }

        const evtSource = new EventSource(
            import.meta.env.VITE_PUSH_NOTIFICATIONS_BASE_URL +
            `/events-streams/v1/notifications/sse?token=${token}`
        );
        attachEventSourceHandlers(evtSource);
    } catch (error) {
        Log.error(`Error occurred: ${error}`);
    }
}
