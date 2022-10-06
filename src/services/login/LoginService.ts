
import { Web } from '@/components/util/';
import type { APISuccessCallback, APIErrorCallback } from '@/components/util/Web';


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

}



