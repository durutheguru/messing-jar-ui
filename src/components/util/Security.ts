
import authTokenStore from '@/store/modules/authToken';


export default class Security {


    public static hasAuthorization(auth: string): boolean {
        const authorizations = authTokenStore.authorizations;
        return authorizations != null && authorizations.length && authorizations.indexOf(auth) >= 0;
    }


}

