
import { Log, Web } from '@/components/util/';
import type { APISuccessCallback, APIErrorCallback } from '@/components/util/Web';
import pinia from '@/store';
import authTokenStore from "@/store/modules/authToken/authToken";


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
        const store = authTokenStore(pinia);
        store.loginError = '';
        store.apiTokens(
            response.access_token, response.refresh_token
        );

        if (navigateHome) {
            Web.navigate("/");
        }
    }


    public static logout() {
        localStorage.clear();
        Web.navigate("/");
    }


}




