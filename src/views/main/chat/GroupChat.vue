<template>

    <div id="group-chat-header-descriptor" class="flex flex-col gap-1 p-3 w-full">
        <div class="text-3xl">Group Name</div>
        <div class="lg:text-lg grid grid-cols-5 md:grid-cols-6 lg:grid-cols-12">
            <div class="col-span-1 md:col-span-1 lg:col-span-1 h-full grow md:pt-4 pt-3">
                <span class=" h-full">23 members</span>
            </div>
            <div class="col-span-4 md:col-span-5 lg:col-span-11 md:pr-10">
                <v-list class="flex flex-row gap-0">
                    <v-list-item style="padding:0px;" v-for="(i, index) in 50" :key="index"
                        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
                    </v-list-item>
                </v-list>
            </div>
        </div>
    </div>

    <message-timeline style="margin-top:7em" />

    <chat-footer />

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MessageTimeline from './components/MessageTimeline.vue';
import ChatFooter from './components/ChatFooter.vue';


export default defineComponent({
    name: 'GroupChat',

    components: {
        ChatFooter,
        MessageTimeline
    },
})
</script>

<style lang="sass" src="@/assets/ext.css" scoped></style>
