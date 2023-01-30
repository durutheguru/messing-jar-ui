<template>

    <section id="message-timeline" v-if="history && history.length">

        <div v-for="(msg, index) in history" :key="index">
            <div v-if="msg.to == user" class="flex flex-row mb-4">
                <div class="flex flex-col gap-2">
                    <v-list-item 
                        :title="otherUserFullName" 
                        :prepend-avatar="otherUserDetails.profilePhotoPublicUrl||'https://randomuser.me/api/portraits/women/85.jpg'">
                    </v-list-item>
                    <div class="bg-indigo-500 shadow-xl p-2 mx-3 rounded-md">
                        <span class="text-white">
                            {{ msg.message }}
                        </span>
                    </div>
                </div>
            </div>

            <div v-if="msg.from == user" class="flex flex-row-reverse w-full mb-4">
                <div class="flex flex-col gap-2">
                    <div class="flex flex-row-reverse">
                        <v-list-item 
                            class="content-right" 
                            title="You"
                            :prepend-avatar="myDetails.profilePhotoPublicUrl||'https://randomuser.me/api/portraits/women/85.jpg'">
                        </v-list-item>
                    </div>
                    <div class="bg-emerald-500 shadow-xl p-2 mx-3 rounded-md">
                        <span class="text-white">
                            {{ msg.message }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div id="bottom-div"></div>

    </section>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
    name: 'MessageTimeline',

    props: {
        user: String,
        history: Array as PropType<Array<any>>,
        myDetails: Object as PropType<any>,
        otherUserDetails: Object as PropType<any>,
    },

    computed: {
        // ...

        myFullName() {
            return `${this.myDetails.firstName} ${this.myDetails.lastName}`;
        },

        otherUserFullName() {
            return `${this.otherUserDetails.firstName} ${this.otherUserDetails.lastName}`;
        },

    },
});
</script>

<style src="@/assets/ext.css" scoped>

</style>


