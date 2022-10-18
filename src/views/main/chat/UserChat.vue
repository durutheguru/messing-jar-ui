<template>

    <div class="flex flex-row mb-4">
        <div class="flex flex-col gap-2 basis-5/6 md:basis-1/2">
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
    </div>

    <div class="flex flex-row-reverse w-full mb-4">
        <div class="flex flex-col gap-2 basis-5/6 md:basis-1/2">
            <div class="flex flex-row-reverse">
                <v-list-item class="content-right" title="You"
                    prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
                </v-list-item>
            </div>
            <div class="bg-emerald-500 shadow-xl py-2 mx-3 h-20 rounded-md">

            </div>
            <div class="bg-emerald-500 shadow-xl py-2 mx-3 h-8 rounded-md">

            </div>
        </div>
    </div>


    <div class="flex flex-row mb-4">
        <div class="flex flex-col gap-2 basis-5/6 md:basis-1/2">
            <v-list-item title="Sandra Adams" prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
            </v-list-item>
            <div class="bg-indigo-500 shadow-xl py-2 mx-3 h-8 rounded-md">

            </div>
            <div class="bg-indigo-500 shadow-xl py-2 mx-3 h-8 rounded-md">

            </div>
            <div class="bg-indigo-500 shadow-xl py-2 mx-3 h-8 rounded-md w-1/2">

            </div>
        </div>
    </div>

    <div class="flex flex-row-reverse w-full mb-4">
        <div class="flex flex-col gap-2 basis-5/6 md:basis-1/2">
            <div class="flex flex-row-reverse">
                <v-list-item class="content-right" title="You"
                    prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
                </v-list-item>
            </div>
            <div class="bg-emerald-500 shadow-xl py-2 mx-3 h-20 rounded-md">

            </div>
            <div class="bg-emerald-500 shadow-xl py-2 mx-3 h-8 rounded-md">

            </div>
        </div>
    </div>

    <div class="flex flex-row mb-4">
        <div class="flex flex-col gap-2 basis-5/6 md:basis-1/2">
            <v-list-item title="Sandra Adams" prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
            </v-list-item>
            <div class="bg-indigo-500 shadow-xl py-2 mx-3 h-8 rounded-md">

            </div>
            <div class="bg-indigo-500 shadow-xl py-2 mx-3 h-8 rounded-md">

            </div>
            <div class="bg-indigo-500 shadow-xl py-2 mx-3 h-8 rounded-md w-1/2">

            </div>
        </div>
    </div>

    <div class="flex flex-row-reverse w-full mb-4">
        <div class="flex flex-col gap-2 basis-5/6 md:basis-1/2">
            <div class="flex flex-row-reverse">
                <v-list-item class="content-right" title="You"
                    prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
                </v-list-item>
            </div>
            <div class="bg-emerald-500 shadow-xl py-2 mx-3 h-20 rounded-md">

            </div>
            <div class="bg-emerald-500 shadow-xl py-2 mx-3 h-8 rounded-md">

            </div>
        </div>
    </div>


    <v-footer elevation="20" app>
        <div class="w-full flex gap-2">
            <div class="py-2 flex-none grid grid-cols-3 gap-2 hidden lg:grid md:hidden sm:hidden">
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
            <div class="py-2 flex-none grid grid-cols-3 gap-2 lg:hidden md:grid sm:grid">
                <v-btn class="col-span-1" :loading="false" :disabled="false" color="primary" size="small"
                    icon="mdi-cloud-upload">
                </v-btn>
                <v-btn class="col-span-1" :loading="false" :disabled="false" color="blue-grey" size="small"
                    icon="mdi-microphone">
                </v-btn>
                <v-btn class="col-span-1" :loading="false" :disabled="false" color="info" size="small"
                    icon="mdi-camera">
                </v-btn>
            </div>
            <div class="grow">
                <v-textarea placeholder="Type your message..." filled no-resize rows="1" row-height="20">
                </v-textarea>
            </div>
            <div class="flex-none">
                <div class="fill-height">
                    <div class="lg:block md:hidden sm:hidden hidden">
                        <v-btn block :loading="false" :disabled="false" color="info"
                            append-icon="mdi-send">
                            Send
                        </v-btn>
                    </div>
                    <div class="md:block lg:hidden xl:hidden block">
                        <v-btn block :loading="false" :disabled="false" color="info"
                            icon="mdi-send">
                        </v-btn>
                    </div>
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
