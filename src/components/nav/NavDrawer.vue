<template>


    <v-navigation-drawer expand-on-hover rail elevation="10" v-model="drawerToggle"
        style="position:fixed;background:#0c4a6eED;color:white">

        <v-list>
            <v-list-item 
            :title="fullName" 
            :prepend-avatar="profilePhotoPublicUrl"
            :subtitle="email"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <div class="px-2 pt-2 text-sm">Chats...</div>

        <v-list>
            <v-list-item
                v-for="(chat, index) in chats" :key="index" :value="chat" :to="'/chat/' + chat.username"
                class="py-2 my-2 text-white">
                <template v-slot:prepend>
                    <v-avatar :image="chat.prependAvatar"></v-avatar>
                </template>
                <v-list-item-title v-text="chat.title"></v-list-item-title>
                <v-list-item-subtitle v-text="chat.subtitle"></v-list-item-subtitle>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <div class="px-2 pt-2 text-sm">Groups...</div>

        <v-list>
            <v-list-item 
                v-for="(group, index) in groups" :key="index" :value="group" 
                :to="'/group/' + group.groupName"
                class="py-2 my-2 text-white">
                <template v-slot:prepend>
                    <v-avatar :image="group.prependAvatar"></v-avatar>
                </template>

                <v-list-item-title v-text="group.title"></v-list-item-title>
                <v-list-item-subtitle v-text="group.subtitle"></v-list-item-subtitle>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>


        <v-list>
            <v-list-item rounded="xl" prepend-icon="mdi-home" title="Home" @click="goHome()">
            </v-list-item>

            <v-list-item rounded="xl" prepend-icon="mdi-cog-outline" title="Settings" @click="goSettings()">
            </v-list-item>

            <v-list-item rounded="xl" prepend-icon="mdi-logout" title="Logout" @click="doLogout()">
            </v-list-item>
        </v-list>

    </v-navigation-drawer>

</template>
  
<script lang="ts">
import { Log, BaseVue, Constants } from '@/components/util';
import { defineComponent } from 'vue';
import userDetailsStore from '@/store/modules/userDetails';
import { mapState } from 'pinia';


export default defineComponent({
    name: 'NavDrawer',

    props: ['drawer'],

    data() {
        return {
            chats: [
                {
                    username: 'david_mayor',
                    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'David Mayor',
                    subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
                },
                {
                    username: 'elvis_mukky',
                    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    title: 'Elvis Muktar',
                    subtitle: `Wish I could come, but I'm out of town this weekend.`,
                },
                {
                    username: 'anna_siseee',
                    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    title: 'Anna Sise',
                    subtitle: 'Do you have Paris recommendations? Have you ever been?',
                },
                {
                    username: 'jen_jen',
                    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Jennyyy',
                    subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
                },
                {
                    username: 'sussy_samuel',
                    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Susan Samuels',
                    subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
                },
            ],

            groups: [
                {
                    groupName: 'ballers',
                    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'Ballers',
                    subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
                },
                {
                    groupName: 'fiddlerz',
                    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    title: 'Fiddlers',
                    subtitle: `Wish I could come, but I'm out of town this weekend.`,
                },
                {
                    groupName: 'tuny_tunez',
                    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    title: 'Music Lovers',
                    subtitle: 'Do you have Paris recommendations? Have you ever been?',
                },
                {
                    groupName: 'donors',
                    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Donors',
                    subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
                },
                {
                    groupName: 'bookies',
                    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Book Club',
                    subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
                },
            ],

            mainActionItems: [
                {
                    title: 'Home',
                    value: 1,
                    props: {
                        prependIcon: 'mdi-home',
                    },
                    action: ''
                },

                {
                    title: 'Settings',
                    value: 1,
                    props: {
                        prependIcon: 'mdi-cog-outline',
                    },
                    action: ''
                },

                {
                    title: 'Logout',
                    value: 1,
                    props: {
                        prependIcon: 'mdi-logout',
                    },
                    action: 'doLogout'
                },
            ]
        };
    },

    computed: {
        ...mapState(userDetailsStore, ['firstName', 'lastName', 'email', 'profilePhotoPublicUrl']),

        drawerToggle() {
            return this.drawer;
        },

        fullName() {
            return `${this.firstName} ${this.lastName}`;
        }
    },

    mounted() {
        Log.info("Nav Drawer Mounted...");
    },

    methods: {
        ...BaseVue.methods(),

        doLogout() {
            Log.info("Handling Logout...");
            this.$emit("logout");
        },

        goHome() {
            this.$router.push("/");
        },

        goSettings() {
            this.$router.push("/settings");
        },
    }

});
</script>
  
<style lang="sass" src="@/assets/ext.css" scoped></style>
  
  