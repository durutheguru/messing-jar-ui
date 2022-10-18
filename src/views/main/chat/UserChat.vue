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

    <app-footer />

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppFooter from '@/components/footer/Footer.vue';


export default defineComponent({
    name: 'UserChat',

    components: {
        AppFooter,
    },
})
</script>

<style lang="sass" src="@/assets/ext.css" scoped></style>
