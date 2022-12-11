
import { Log, Util } from '@/components/util';
import { defineStore } from 'pinia';


const userDetailsStore = defineStore('userDetails', {
    state: () => {
      return {
        firstName: "",
        lastName: "",
        email: "",
        profilePhotoRef: "",
        profilePhotoPublicUrl: "",
      }
    },
  
    getters: {
      getFirstName(context: any) {
        return context.firstName;
      },
    
      getLastName(context: any) {
        return context.lastName;
      },
  
      getEmail(context: any) {
        return context.email;
      },

      getProfilePhotoRef(context: any) {
        return context.email;
      },

      getProfilePhotoUrl(context: any) {
        return context.profilePhotoPublicUrl;
      },
    },
    
    actions: {
      setUserDetails(userDetails: any) {
        Log.info(`Setting User details in store: ${userDetails}`);
        Util.copy(userDetails, this);
      },
    },
  
    persist: {
      storage: localStorage
    }
  });
  
  export default userDetailsStore;
  
