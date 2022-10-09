
<template>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Log, Util, Web } from '@/components/util/';
import LoginService from '@/services/login/LoginService';
import authTokenStore from "@/store/modules/authToken/authToken";



export default defineComponent({
    setup() {
        
    },

    mounted() {
        const store = authTokenStore();

        let code = this.$route.query.code;
        Log.info(`OAuth Redirected. Code: ${code}`);
        
        if (typeof code === 'string') {
            LoginService.exchangeAuthCode(
                code,

                (response) => {
                    Log.info(`Response: ${JSON.stringify(response)}`);
                    LoginService.handleSuccessfulLogin(response.data, true);
                },

                (error) => {
                    Log.error(`Error: ${JSON.stringify(error)}`);
                    store.loginError = Util.extractError(error);
                    Web.navigate(`/login`);
                }
            );
        }
    }
})
</script>
