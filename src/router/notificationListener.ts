
import { EventTrigger } from '@/components/core/Event';
import { Log, Util, Web } from '@/components/util';
import '@/services/events/PushNotificationListener';
import pinia from '@/store';

import sseTokenStore from '@/store/modules/sseToken';
import { LocalDateTime, ZonedDateTime } from '@js-joda/core';


function attachEventSourceHandlers(evtSource: EventSource) {
    evtSource.onmessage = function(message: any) {
        try {
            Log.info(`Message received. Data: ${JSON.stringify(message.data)}`);
            let item = JSON.parse(message.data);
            EventTrigger.trigger(item.event, message.data);
        }
        catch (ex) { }
    };

    evtSource.onopen = function(event) {
        Log.info("SSE Connection is Open...");
    };

    evtSource.onerror = function() {
        Log.info("Error in SSE Connection...");
    };
}


export default async function(to: any, from: any) {
    try {
        let tokenStore = sseTokenStore(pinia);
        let now = LocalDateTime.now();
        let fetchToken = false;

        if (Util.isValidString(tokenStore.getExpiry)) {
            let expiryDate = LocalDateTime.parse(tokenStore.getExpiry);
            if (expiryDate.isBefore(now)) {
                fetchToken = true;
            }
        }
        else {
            fetchToken = true;
        }

        let token = "";
        if (fetchToken) {
            let response = await Web.getAbsoluteAsync(import.meta.env.VITE_PUSH_NOTIFICATIONS_BASE_URL + '/events-streams/v1/notifications/token');

            Log.info(`SSEvents Token Response: ${JSON.stringify(response.data)}`);

            const tokenResponse = response.data;
            tokenStore.setTokenData(tokenResponse);

            token = tokenResponse.token;
        }
        else {
            token = tokenStore.getToken;
        }

        const evtSource = new EventSource(
            import.meta.env.VITE_PUSH_NOTIFICATIONS_BASE_URL + 
            `/events-streams/v1/notifications/sse?token=${token}`
        );
        attachEventSourceHandlers(evtSource);
    }
    catch (error) {
        Log.error(`Error occurred: ${error}`);
    }
}
  

