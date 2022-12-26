<template>


  <v-app-bar app>

    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="setDrawer(!drawer)"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>MessingJar</v-app-bar-title>

    <v-btn v-if="search == null" @click="search = ''" icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-menu v-if="search != null" open-on-focus transition="slide-y-transition">
      <template v-slot:activator="{ props }">

        <v-text-field v-bind="props" v-show="search != null" v-model="search" density="compact" variant="underlined"
          placeholder="Search" append-inner-icon="mdi-close" single-line hide-details
          @click:append-inner="cancelSearch"></v-text-field>

      </template>

      <v-card min-width="300" class="pb-5">
        <v-list>
          <v-list-subheader>Recent Search...</v-list-subheader>
          <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg" title="John Leider"
            subtitle="Founder of Vuetify">
          </v-list-item>
        </v-list>

        <v-divider></v-divider>


        <v-list>
          <v-list-subheader>Results...</v-list-subheader>
          <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg" title="John Leider"
            subtitle="Founder of Vuetify">
          </v-list-item>
          <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg" title="John Leider"
            subtitle="Founder of Vuetify">
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
import { Constants } from "@/components/util";

declare interface AppHeaderData {
  menu: Boolean,
  drawer: Boolean | null,
  search: String | null,
};

export default defineComponent({
  name: 'AppHeader',

  data(): AppHeaderData {
    return {
      menu: true,

      drawer: null,

      search: null,
    };
  },

  methods: {

    setDrawer(val: boolean) {
      this.drawer = val;
      Event.EventTrigger.trigger(
        Constants.sidebarToggleEvent,
        this.drawer
      );
    },

    cancelSearch() {
      this.search = null;
    }
    
  }
});
</script>

<style>

</style>