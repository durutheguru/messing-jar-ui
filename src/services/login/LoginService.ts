
import { Web } from '@/components/util/';
import type { APISuccessCallback, APIErrorCallback } from '@/components/util/Web';
import pinia from '@/store';
import authTokenStore from "@/store/modules/authToken/authToken";


export default class LoginService {


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



    public static handleSuccessfulLogin(response: any) {
        const store = authTokenStore(pinia);
        store.apiTokens(
            response.access_token, response.refresh_token
        );
        Web.navigate("/");
    }

}



