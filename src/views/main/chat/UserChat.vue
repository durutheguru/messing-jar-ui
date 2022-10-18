<template>

    <div class="flex flex-col gap-2 w-1/2">
        <v-list-item title="Sandra Adams" prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
        </v-list-item>
        <div class="bg-indigo-500 shadow-xl py-2 mx-3 h-8 rounded-md">

        </div>
        <div class="bg-indigo-500 shadow-xl py-2 mx-3 h-8 rounded-md">

        </div>
        <div class="bg-indigo-500 shadow-xl py-2 mx-3 h-16 rounded-md w-1/2">

        </div>
        <div class="bg-indigo-500 shadow-xl py-2 mx-3 h-8 rounded-md w-1/2">

        </div>
    </div>

    <div class="flex flex-row-reverse">
        <div class="flex flex-col gap-2 w-1/2">
            <v-list-item title="Sandra Adams" prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
            </v-list-item>
            <div class="bg-emerald-500 shadow-xl py-2 mx-3 h-20 rounded-md">

            </div>
            <div class="bg-emerald-500 shadow-xl py-2 mx-3 h-8 rounded-md">

            </div>
        </div>
    </div>

    <div class="flex flex-col gap-2 w-1/2">
        <v-list-item title="Sandra Adams" prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
        </v-list-item>
        <div class="bg-indigo-500 shadow-xl py-2 mx-3 h-8 rounded-md">

        </div>
        <div class="bg-indigo-500 shadow-xl py-2 mx-3 h-8 rounded-md">

        </div>
        <div class="bg-indigo-500 shadow-xl py-2 mx-3 h-8 rounded-md w-1/2">

        </div>
    </div>

    <div class="flex flex-row-reverse">
        <div class="flex flex-col gap-2 w-1/2">
            <v-list-item title="Sandra Adams" prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
            </v-list-item>
            <div class="bg-emerald-500 shadow-xl py-2 mx-3 h-8 rounded-md">

            </div>
            <div class="bg-emerald-500 shadow-xl py-2 mx-3 h-8 rounded-md">

            </div>
            <div class="bg-emerald-500 shadow-xl py-2 mx-3 h-8 rounded-md w-1/2">

            </div>
        </div>
    </div>

    <div class="flex flex-col gap-2 w-1/2">
        <v-list-item title="Sandra Adams" prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
        </v-list-item>
        <div class="bg-indigo-500 shadow-xl py-2 mx-3 h-8 rounded-md">

        </div>
        <div class="bg-indigo-500 shadow-xl py-2 mx-3 h-8 rounded-md">

        </div>
        <div class="bg-indigo-500 shadow-xl py-2 mx-3 h-8 rounded-md w-1/2">

        </div>
    </div>

    <div class="flex flex-row-reverse">
        <div class="flex flex-col gap-2 w-1/2">
            <v-list-item title="Sandra Adams" prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
            </v-list-item>
            <div class="bg-emerald-500 shadow-xl py-2 mx-3 h-8 rounded-md">

            </div>
            <div class="bg-emerald-500 shadow-xl py-2 mx-3 h-8 rounded-md">

            </div>
            <div class="bg-emerald-500 shadow-xl py-2 mx-3 h-8 rounded-md w-1/2">

            </div>
        </div>
    </div>

    <v-footer elevation="20" app>
        <div class="w-full grid grid-cols-12 gap-2">
            <div class="py-5 col-span-3 grid grid-cols-3 gap-2">
                <v-btn class="col-span-1" :loading="false" :disabled="false" color="primary" size="small"
                    prepend-icon="mdi-cloud-upload">
                    Upload
                </v-btn>
                <v-btn class="col-span-1" :loading="false" :disabled="false" color="blue-grey" size="small"
                    prepend-icon="mdi-microphone">
                    Voice
                </v-btn>
                <v-btn class="col-span-1" :loading="false" :disabled="false" color="info" size="small"
                    prepend-icon="mdi-camera">
                    Camera
                </v-btn>
            </div>
            <div class="col-span-8">
                <v-textarea placeholder="Message" filled no-resize rows="1" row-height="20">
                </v-textarea>
            </div>
            <div class="col-span-1">
                <div class="fill-height">
                    <v-btn block :loading="false" :disabled="false" color="secondary" size="x-large"
                        append-icon="mdi-send">
                        Send
                    </v-btn>
                </div>

            </div>
        </div>
    </v-footer>

</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'UserChat',


})
</script>

<style lang="sass" src="@/assets/ext.css" scoped></style>
