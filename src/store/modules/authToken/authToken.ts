import Web from "@/components/util/Web";
import UserAuthContext from "./UserAuthContext";
// import "@/interceptors/auth/AuthCheckInterceptor";
import { Log } from "@/components/util";
import { defineStore } from 'pinia';


const authTokenStore = defineStore('authToken', {
  state: () => {
    return {
      username: "",
      loggedIn: false,
      authToken: null,
      refreshToken: null,
      userEnabled: false,
      authorizations: [],
      entryUrl: '',
      loginError: '',
    }
  },

  getters: {
    getUsername(context: any) {
      return context.username;
    },
  
    getApiToken(context: any) {
      return context.authToken;
    },

    getRefreshToken(context: any) {
      return context.refreshToken;
    },
  
    isLoggedIn(context: any) {
      return context.loggedIn;
    },
  
    isUserActive(context: any) {
      return context.userEnabled;
    },
  
    getAuthorizations(context: any) {
      return context.authorizations;
    },
  
    isAuthorized(context: any) {
      return (authority: string) => {
        return (
          context.authorizations.length > 0 &&
          context.authorizations.indexOf(authority) > -1
        );
      };
    },

    getEntryUrl(context: any) {
      return context.entryUrl;
    },

    getLoginError(context: any) {
      return context.loginError;
    },
  },
  
  actions: {
    async authenticate(context: any) {
      return new Promise((resolve, reject) => {
        Web.get(
          "/api/auth",
  
          (response: any) => {
            resolve(true);
          },
  
          (error: any) => {
            resolve(false);
          }
        );
      });
    },

    apiTokens(accessToken: string, refreshToken: string) {
      this.loggedIn = true;
      this.authToken = accessToken;
      this.refreshToken = refreshToken;
  
      const userAuthContext = UserAuthContext.getInstance();
      userAuthContext.initialize(accessToken);
  
      this.username = userAuthContext.userId();
      this.userEnabled = userAuthContext.isEnabled();
      this.authorizations = userAuthContext.authorizationList();
      Log.info(`Context State: context.userEnabled ${this.userEnabled}`);
    },
  
    logout(context: any) {
      context.loggedIn = false;
      context.authToken = null;
      context.refreshToken = null;
  
      context.username = "";
      context.userEnabled = null;
      context.authorizations = [];
    },
  },

  persist: {
    storage: localStorage
  }
})

export default authTokenStore;

