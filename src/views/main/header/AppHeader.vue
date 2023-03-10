<template>


  <v-app-bar app>

    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>MessingJar</v-app-bar-title>

    <v-btn v-if="search == null" @click="search = ''" icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-menu v-if="search != null" open-on-focus transition="slide-y-transition">
      <template v-slot:activator="{ props }">

        <v-text-field v-bind="props" 
          v-show="search != null" 
          v-model="search" 
          density="compact" 
          variant="underlined"
          placeholder="Search" 
          append-inner-icon="mdi-close" single-line hide-details
          @click:append-inner="cancelSearch"
          @input="handleSearch"></v-text-field>

      </template>

      <v-card v-show="searchResults.length" min-width="300" class="pb-5">
        <v-list>
          <v-list-subheader v-show="searchResults.length">Results...</v-list-subheader>
          <v-list-item 
            v-for="result in searchResults" 
            :key="result.username" 
            :prepend-avatar="result.profilePhotoUrl" 
            :title="`${result.firstName} ${result.lastName}`"
            :subtitle="result.email"
            :href="`/chat/${result.username}`">
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>

  </v-app-bar>


</template>

<script lang="ts">
import { defineComponent } from "vue";
import Event from '@/components/core/Event';
import { Constants, Log, Util } from "@/components/util";
import SearchService from './service/SearchService';


declare interface AppHeaderData {
  menu: Boolean,
  search: string | null,
  searchResults: Array<any>
}

export default defineComponent({
  name: 'AppHeader',

  data(): AppHeaderData {
    return {
      menu: true,

      search: null,

      searchResults: [],
    };
  },

  methods: {

    toggleDrawer() {
      Event.EventTrigger.trigger(Constants.sidebarToggleEvent);
    },

    cancelSearch() {
      this.search = null;
    },

    handleSearch() {
      let self = this;

      Util.throttle({
        key: 'global-search',
        run: () => {
          if (self.search == null || !Util.isValidString(self.search)) {
            return;
          }

          SearchService.search(
            self.search, 

            (response) => {
              Log.info(`Search Response received: ${JSON.stringify(response)}`);
              self.searchResults = response.data.userSearchResults;
            },

            (error) => {
              Log.error(`Search Error occurred: ${Util.extractError(error)}`);
            },
          );
        },
        timeout: 300
      });
    }
    
  }
});
</script>

<style>

</style>