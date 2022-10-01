
import authTokenStore from '@/store/modules/authToken/authToken';


export default class Security {


    public static hasAuthorization(auth: string): boolean {
        const store: any = authTokenStore();
        const authorizations = store.authorizations;
        return authorizations != null && authorizations.length && authorizations.indexOf(auth) >= 0;
    }


}

