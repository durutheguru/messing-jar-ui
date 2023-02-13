
import { Log, Web } from '@/components/util/';
import type { APISuccessCallback, APIErrorCallback } from '@/components/util/Web';


export default class GroupService {


    public static saveGroup(
        group: {name: string, iconImageRef: string},
        successHandler: APISuccessCallback, 
        errorHandler: APIErrorCallback
    ) {
        Web.post(
            "/api/v1/group", group, 
            successHandler, errorHandler
        );
    }


}

