
import { Web } from '@/components/util';
import type { APIErrorCallback, APISuccessCallback } from '@/components/util/Web';


export default class FileService {


    public static getFile(fileRefs: String[], successCallback: APISuccessCallback, errorCallback: APIErrorCallback) {
        let params = "";
        for (let ref in fileRefs) {
            params += `ref=${ref}&`;
        }

        Web.get("/_files?" + params, successCallback, errorCallback);
    }


}

