
import { createApp } from 'vue'


export default class Mount {


    public static component(component: any) {
        const app = createApp(component);
        app.mount('#app');
    }

}
