<template>

  <v-app>
    <nav-drawer :drawer="drawer" @update:modelValue="setDrawer(!drawer)" @logout="logout()" />

    <v-app-bar app>

      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>MessingJar</v-app-bar-title>

      <v-btn v-if="search==null" @click="search=''" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu v-if="search!=null" open-on-focus transition="slide-y-transition">
        <template v-slot:activator="{ props }">

          <v-text-field v-bind="props" v-show="search!=null" v-model="search" density="compact" variant="underlined"
            placeholder="Search" append-inner-icon="mdi-close" single-line hide-details
            @click:append-inner="cancelSearch"></v-text-field>

        </template>

        <v-card min-width="300">
          <v-list>
            <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg" title="John Leider"
              subtitle="Founder of Vuetify">
              <template v-slot:append>
                <v-btn variant="text" :class="fav ? 'text-red' : ''" icon="mdi-heart" @click="fav = !fav"></v-btn>
              </template>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item>
              <v-switch color="purple" label="Enable messages" hide-details></v-switch>
            </v-list-item>

            <v-list-item>
              <v-switch color="purple" label="Enable hints" hide-details></v-switch>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="menu = false">
              Cancel
            </v-btn>
            <v-btn color="primary" text @click="menu = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>



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
import NavDrawer from '@/components/nav/NavDrawer.vue';
import { Log } from '@/components/util';
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
    Log.info("Home View Log...");
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
