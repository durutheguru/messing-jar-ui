<template>
    
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign Up on MessingJar</h2>
        </div>
        
        <div>
            <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent border-gray-300 py-2 px-4 text-sm font-medium hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="signUpWithOAuthService">
              Sign up with OAuth Service
            </button>
          </div>
      </div>
    </div>

</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { Log, Web } from '@/components/util/';

export default defineComponent({
    name: 'SignUpView',

    data() {
      return {
        username: '',

      };
    },

    methods: {
      signUpWithOAuthService() {
        Log.info(`Navigating to OAuth Service in a bit...`);
        Web.navigate(`${import.meta.env.VITE_OAUTH_BASE_URL}/signup?cid=${import.meta.env.VITE_OAUTH_CLIENT_ID}&rid=${import.meta.env.VITE_OAUTH_RESOURCE_SERVER_ID}`);
      }
    }
});
</script>


