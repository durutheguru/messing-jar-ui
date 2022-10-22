<template>
    <div class="md:flex md:flex-row md:m-8 grid grid-cols-6">
        <div class="md:flex-none col-span-6 text-center">
            <v-avatar size="200" class="md:mx-3">
                <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
            </v-avatar>
        </div>
        <div class="md:grow col-span-6">
            <v-form ref="form" v-model="valid" class="pa-4 pt-6">
                <div class="flex flex-row">
                    <v-text-field class="grow" v-model="firstName" filled color="deep-purple" label="First Name">
                    </v-text-field>
                    <v-text-field class="grow" v-model="lastName" filled color="deep-purple" label="Last Name">
                    </v-text-field>
                </div>
                <v-text-field v-model="email" :rules="emailRules" filled color="deep-purple" label="Email Address"
                    type="email"></v-text-field>
                <v-switch color="indigo" v-model="emailSwitch" hide-details inset 
                    :label="`Trigger emails from Messages`"></v-switch>
            </v-form>
        </div>
    </div>
    <div class="mt-3 md:flex md:flex-row grid grid-cols-6">
        <v-btn size="x-large" color="error" class="mr-2 col-span-3">Reset</v-btn>
        <v-btn size="x-large" color="info" class="col-span-3">Save Changes</v-btn>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            valid: false,
            firstName: '',
            lastName: '',
            email: '',
            emailRules: [
                (v: any) => !!v || 'E-mail is required',
                (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            emailSwitch: false
        };
    }
});
</script>

<style src="@/assets/ext.css" scoped></style>
