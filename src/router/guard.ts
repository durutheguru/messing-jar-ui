import pinia from '@/store';
import authTokenStore from "@/store/modules/authToken/authToken";
import { Log, Web, Util } from "@/components/util";


const store = authTokenStore(pinia);



const authRoute = async (to: any, next: any) => {
  Log.info("Auth Logged In: " + store.loggedIn);

  if (store.loggedIn) {
    // TODO: fix this, convert to checking the expiration on persisted token
    const authenticated = await store.authenticate();
    if (!authenticated) {
      navigateLogin(to, next);
    } else {
      let userActive = store.userEnabled;
      Log.info(`User Active: ${userActive}`);
      if (userActive === true) {
        Log.info(`Navigating to Path: ${to.path}`);
        navigatePath(to, next);
      } else if (userActive === false) {
        Log.info(`Navigating to User activation`);
        Web.navigate("/user_activation");
      } else {
        Log.warn("userActive flag undefined. Unable to proceed");
      }
    }
  } else {
    navigateLogin(to, next);
  }
};

// const navigateLogin = (to: any, next: any) => {
//   store.commit("entryUrl", to.path);
//   Web.navigate("/login");
// };
const navigateLogin = (to: any, next: any) => {
  store.$patch({entryUrl: to.path});
  Web.navigate("/login");
};

const navigatePath = (to: any, next: any) => {
  const url = store.getters.entryUrl;
  const authorizations = store.authorizations;

  if (to.meta.auth && to.meta.auth.length > 0) {
    if (!authorizations.some((auth: string) => to.meta.auth.includes(auth))) {
      Log.info("doesnt have auth");
      navigateLogin(to, next);
      return;
    }
  }

  if (Util.isValidString(url)) {
    next(url);
    store.commit("entryUrl", null);
  } else {
    next();
  }

  // else check meta property against user authorities. if it contains at least one of the auths then go to page else
  // go to landing page
};

export default function(to: any, from: any, next: any) {
  if (to.matched.some((record: any) => record.meta.skipAuth)) {
    next();
    return;
  }

  authRoute(to, next);
}

// if not authenticated, navigate to landing
