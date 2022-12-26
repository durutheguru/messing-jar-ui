
import { Log, Util } from '@/components/util';
import { defineStore } from 'pinia';


const sseTokenStore = defineStore('sseToken', {
    state: () => {
      return {
        token: "",
        expiresOn: "",
      };
    },
  
    getters: {
      getToken(context: any) {
        return context.token;
      },
    
      getExpiry(context: any) {
        return context.expiresOn;
      },
    },
    
    actions: {
      setTokenData(tokenData: any) {
        Log.info(`Setting SSE Token Data in store: ${tokenData}`);
        Util.copy(tokenData, this);
      },
    },
  
    persist: {
      storage: localStorage
    },
  });
  
  export default sseTokenStore;
  
