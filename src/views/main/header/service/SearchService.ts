
import { Web } from '@/components/util';
import type { APIErrorCallback, APISuccessCallback } from '@/components/util/Web';


export default class SearchService {


    public static search(query: string, successCallback: APISuccessCallback, errorCallback: APIErrorCallback) {
        Web.get(
            `/api/v1/search?query=${query}`,
            successCallback, errorCallback
        );
    }


}



