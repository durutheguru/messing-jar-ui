
<template>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Log } from '@/components/util/';
import LoginService from '@/services/login/LoginService';

export default defineComponent({
    setup() {
        
    },

    mounted() {
        let code = this.$route.query.code;
        Log.info(`OAuth Redirected. Code: ${code}`);
        
        if (typeof code === 'string') {
            LoginService.exchangeAuthCode(
                code,

                (response) => {
                    Log.info(`Response: ${JSON.stringify(response)}`);
                },

                (error) => {
                    Log.error(`Error: ${JSON.stringify(error)}`);
                }
            )
        }
    }
})
</script>
