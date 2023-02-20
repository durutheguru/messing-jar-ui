<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">

import { defineComponent, provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import authTokenStore from "@/store/modules/authToken";
import notificationListener from '@/router/notificationListenerWS';


function getHeaders() {
  const authStore = authTokenStore();
  const headers: { Authorization?: string; "Content-Type"?: string } = {};
  
  headers["Authorization"] = `Bearer ${authStore.getApiToken}`;
  headers["Content-Type"] = "application/json";

  return headers;
}

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_BASE_URL}/graphql`,
  fetch: (uri, options: any) => {
    options.headers = getHeaders();
    return fetch(uri, options);
  },
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});


export default defineComponent({
  name: 'App',

  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  data() {
    return {
      //
    };
  },

  mounted() {
    notificationListener();
  },
});


</script>
