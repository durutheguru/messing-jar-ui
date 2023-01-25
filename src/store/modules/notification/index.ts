
import { Log, Util } from '@/components/util';
import { defineStore } from 'pinia';
import type { Notification } from './Notification'


const notificationsStore = defineStore('notifications', {
    state: () => {

      return {
        notifications: []
      };
      
    },
  
    getters: {

      getNotifications(context: any) {
        return context.notifications;
      },
    
    },
    
    actions: {
      addNotification(notification: Notification) {
        Log.info(`Adding Notification to store: ${notification}`);
        this.notifications.push(notification);
        this.notifications = this.notifications.slice(0, 10); // keep last 10 notifications
      },

      clearNotifications() {
        Log.info(`Clearing Notifications in store`);
        this.notifications = [];
      },

      viewedNotification(notification: Notification) {
        Log.info(`Marking Notification as viewed in store: ${notification}`);
        notification.viewed = true;
      },

    },
  
    persist: {
      storage: localStorage
    },
  });
  
  export default notificationsStore;
  
