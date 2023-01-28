import { EventTrigger } from "@/components/core/Event";
import { Constants, Log, Util, Web } from "@/components/util";
import "@/services/events/ProfileDetailsUpdateListener";
import "@/services/events/NotificationEventListener";
import pinia from "@/store";

import sseTokenStore from "@/store/modules/sseToken";
import { LocalDateTime, ZonedDateTime } from "@js-joda/core";



function attachEventSourceHandlers(ws: WebSocket) {
    ws.onmessage = function (message: any) {
        try {
            Log.info(`Message received. Message: ${JSON.stringify(message)}`);
            const item = JSON.parse(message.data);
            
            if (Util.isValidString(item)) {
                return;
            }

            EventTrigger.trigger(item.type, item);
        } catch (ex) {
            Log.warn(`Message is not JSON or Binary. Treating as text: ${message.data}`)
        }
    };

    ws.onopen = function (event) {
        Log.info("WS Connection is Open...");
    };

    ws.onerror = function () {
        Log.info("Error in WS Connection...");
    };

    EventTrigger.trigger(Constants.webSocketInitializedEvent, ws);
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

            Log.info(`WebSockets Token Response: ${JSON.stringify(response.data)}`);

            const tokenResponse = response.data;
            tokenStore.setTokenData(tokenResponse);

            token = tokenResponse.token;
        } else {
            token = tokenStore.getToken;
        }

        const ws = new WebSocket(
            import.meta.env.VITE_WEB_SOCKET_BASE_URL +
            `/ws/connect?token=${token}`
        );
        attachEventSourceHandlers(ws);
    } catch (error) {
        Log.error(`Error occurred: ${error}`);
    }
}

