import { Log } from "@/components/util";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


console.log("Creating Pinia instance...");
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


export default pinia;

