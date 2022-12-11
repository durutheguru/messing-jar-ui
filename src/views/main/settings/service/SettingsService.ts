
import { Web } from '@/components/util';
import type { APIErrorCallback, APISuccessCallback } from '@/components/util/Web';


export default class SettingsService {


    public static saveSettings(
        settings: any, successHandler: APISuccessCallback, errorHandler: APIErrorCallback
    ) {
        Web.patch(
            '/api/v1/user', settings, successHandler, errorHandler
        );
    }

    
    public static fetchUserSettings(
        successHandler: APISuccessCallback, errorHandler: APIErrorCallback
    ) {
        Web.get(
            '/api/v1/user', successHandler, errorHandler
        );
    }


}


