<template>
  <!-- <hello-world /> -->
  <v-app>
    <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>

    <v-app-bar 
      density="prominent"
      app>

      <v-app-bar-title>MessingJar</v-app-bar-title>

      <template v-slot:append>
          <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon="mdi-arrow-up-thin-circle-outline" @click="logout" v-bind="attrs"
              v-on="on"></v-btn>
          </template>
          <span>Logout</span>
        </v-tooltip>
        </template>
      
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <v-btn
      flat
      color="secondary">
      Secondary
    </v-btn> 

    <v-btn 
      color="blue-grey"
      prepend-icon="mdi-cloud-upload"
      @click="load(2)"
    >
      Upload
    </v-btn>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Log } from '@/components/util';
import LoginService from '@/services/login/LoginService';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',

  mounted() {
    Log.info("Home View Log...");
  },

  methods: {
    logout() {
      Log.info("Logging out..");
      LoginService.logout();
    }
  }
});
</script>
