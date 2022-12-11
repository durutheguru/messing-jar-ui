
import Event from '@/components/core/Event';
import { Constants, Log } from '@/components/util';
import pinia from '@/store';
import userDetailsStore from '@/store/modules/userDetails';


Event.emitter.on(
    Constants.profileDetailsUpdateEvent, 

    (event: any) => {
        const store = userDetailsStore(pinia);

        Log.info(`Profile Update Event received: ${event}`);
        let update = JSON.parse(event).data;
        update = JSON.parse(update);

        store.setUserDetails(update);
    }
);

