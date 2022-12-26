<template>

  <v-app>

    <nav-drawer 
      :drawer="drawer" 
      @update:modelValue="setDrawer($event)"
      @logout="logout()" />

    <app-header :drawer="drawer" />

    <v-main>

      <v-container fluid>

        <router-view></router-view>

      </v-container>

    </v-main>

  </v-app>

</template>

<script lang="ts">
import Event from '@/components/core/Event';
import AppHeader from '../main/header/AppHeader.vue';
import NavDrawer from '@/components/nav/NavDrawer.vue';
import { Constants, Log } from '@/components/util';
import LoginService from '@/services/login/LoginService';
import { defineComponent } from 'vue';


declare interface HomeVueData {
  fav?: Boolean,
  menu?: Boolean,
  drawer: Boolean | null,
  search: String | null,
  chats: Array<any>,
  groups: Array<any>,
  mainActionItems: Array<any>
};


export default defineComponent({
  name: 'HomeView',

  components: {
    NavDrawer,
    AppHeader,
  },

  data(): HomeVueData {
    return {
      fav: true,

      menu: true,

      drawer: null,

      search: null,

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
    let self = this;
    Log.info("Home View Log...");
    Event.emitter.on(
      Constants.sidebarToggleEvent, function(update: boolean) {
        self.drawer = update;
      },
    );
  },

  methods: {
    logout() {
      Log.info("Logging out..");
      LoginService.logout();
    },

    setDrawer(drawer: boolean) {
      this.drawer = drawer;
    },

    cancelSearch() {
      this.search = null;
    }
  }
});
</script>

<style lang="sass" src="@/assets/ext.css" scoped></style>
