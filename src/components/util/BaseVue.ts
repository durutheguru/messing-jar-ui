
import { Web } from '.';

export default class BaseVue {

    public static methods() {
        return {
            navigate(url:string) {
                Web.navigate(url);
            },
        };
    }


};

