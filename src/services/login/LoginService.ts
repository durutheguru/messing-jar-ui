
import { Log, Web } from '@/components/util/';
import type { APISuccessCallback, APIErrorCallback } from '@/components/util/Web';
import pinia from '@/store';
import authTokenStore from "@/store/modules/authToken";
import userDetailsStore from '@/store/modules/userDetails';
import SettingsService from '@/views/main/settings/service/SettingsService';


export default class LoginService {


    public static ping() {
        Web.get(
            "/api/auth",
            
            () => {
                Log.info("Ping successful...");
            },

            () => {
                Log.error("Ping failed...");
            }
        );
    }


    public static exchangeAuthCode(
        code: string | null, 
        successHandler: APISuccessCallback, 
        errorHandler: APIErrorCallback
    ) {
        Web.post(
            `/auth/token?code=${code}`, null,
            successHandler, errorHandler
        );
    }


    public static refreshAuthToken(
        refreshToken: string
    ) {
        return Web.postAsync(
            `/auth/token/refresh?token=${refreshToken}`, null
        )
        .then(response => {
            Log.info(`Refresh Token responded: ${JSON.stringify(response)}`);
            LoginService.handleSuccessfulLogin(response.data);
            return response.data.access_token;
        });
    }


    public static handleSuccessfulLogin(response: any, navigateHome?: boolean) {
        const self = this;
        const _authTokenStore = authTokenStore(pinia);
        const _userDetailsStore = userDetailsStore(pinia);

        _authTokenStore.loginError = '';
        _authTokenStore.apiTokens(
            response.access_token, response.refresh_token
        );

        SettingsService.fetchUserSettings(
            response => {
                _userDetailsStore.setUserDetails(response.data);

                if (navigateHome) {
                    Web.navigate("/");
                }
            },

            error => {
                setTimeout(() => {
                    self.handleSuccessfulLogin(response, navigateHome);
                }, 500);
            }
        );
    }


    public static logout() {
        localStorage.clear();
        Web.navigate("/login");
    }


}




