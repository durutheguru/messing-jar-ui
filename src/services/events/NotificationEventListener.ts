import Event from "@/components/core/Event";
import { Constants, Log } from "@/components/util";
import pinia from "@/store";
import notificationsStore from "@/store/modules/notification";

Event.emitter.on(
  Constants.notificationEvent,

  (event: any) => {
    const store = notificationsStore(pinia);

    Log.info(`Notifications Event received: ${event}`);
    let update = JSON.parse(event).data;
    update = JSON.parse(update);

    store.addNotification(update);
  }
);

