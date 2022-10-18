<template>
  <!-- <hello-world /> -->
  <v-app>
    <v-navigation-drawer expand-on-hover rail elevation="10" v-model="drawer"
      style="position:fixed;background:#059669DE;color:white">
      <v-list>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Sandra Adams"
          subtitle="sandra_a88@gmailcom"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list :items="chats" item-props lines="one">
        <template v-slot:subtitle="{ subtitle }">
          <div class="my-2" v-html="subtitle"></div>
        </template>
      </v-list>

      <v-divider></v-divider>

      <v-list :items="groups" item-props lines="one">
        <template v-slot:subtitle="{ subtitle }">
          <div class="my-2" v-html="subtitle"></div>
        </template>
      </v-list>

      <v-divider></v-divider>


      <v-list :items="mainActionItems"></v-list>

    </v-navigation-drawer>

    <v-app-bar app>

      <template v-slot:prepend>
          <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
        </template>

      <v-app-bar-title>MessingJar</v-app-bar-title>

      <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

      <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>

    </v-app-bar>

    <v-main>
      
      <v-container fluid>

        <router-view></router-view>
        
      </v-container>

    </v-main>

  </v-app>
</template>

<script lang="ts">
import { Log } from '@/components/util';
import LoginService from '@/services/login/LoginService';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',

  data() {
    return {
      drawer: null,

      chats: [
        { type: 'subheader', title: 'Chats' },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'David Mayor',
          subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Elvis Muktar',
          subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Anna Sise',
          subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Jennyyy',
          subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Susan Samuels',
          subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],

      groups: [
        { type: 'subheader', title: 'Groups' },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'David Mayor',
          subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Elvis Muktar',
          subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Anna Sise',
          subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Jennyyy',
          subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Susan Samuels',
          subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],

      mainActionItems: [
        {
          title: 'Home',
          value: 1,
          props: {
            prependIcon: 'mdi-home',
          },
        },

        {
          title: 'Settings',
          value: 1,
          props: {
            prependIcon: 'mdi-cog-outline',
          },
        },

        {
          title: 'Logout',
          value: 1,
          props: {
            prependIcon: 'mdi-logout',
          },
        },
      ]
    };
  },

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

<style lang="sass" src="@/assets/ext.css" scoped></style>

