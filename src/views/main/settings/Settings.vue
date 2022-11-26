<template>
    <div class="md:flex md:flex-row md:m-8 grid grid-cols-6">
        <div class="md:flex-none col-span-6 text-center">

            <v-hover close-delay="1000" v-slot="{ isHovering, props }">
                <v-avatar size="200" class="md:mx-3" v-bind="props">
                    <v-img :src="profilePhotoUrl" alt="John">
                        <v-expand-transition>
                            <div
                                v-if="isHovering"
                                class="v-hover--reveal grid grid-cols-3 gap-4 h-full settings-profile-photo-upload-hover">
                                <div class="align-middle col-start-2">
                                    <v-btn
                                        icon
                                        class="p-2"
                                        variant="outlined"
                                        color="white"
                                        @click="selectProfilePhotoToUpload()">
                                        <v-icon>mdi-upload</v-icon>
                                    </v-btn>
                                    <input
                                        autocomplete="off"
                                        type="file"
                                        id="profilePhoto"
                                        ref="profilePhoto"
                                        name="profilePhoto"
                                        accept="image/png, image/jpeg, image/jpg"
                                        placeholder="upload file"
                                        class="hidden"
                                        v-on:change="fileChanged"
                                    />
                                </div>
                            </div>
                        </v-expand-transition>
                    </v-img>
                </v-avatar>
            </v-hover>
        </div>
        <div class="md:grow col-span-6">
            <v-form ref="form" v-model="valid" class="pa-4 pt-6">
                <div class="flex flex-row">
                    <v-text-field class="grow" v-model="firstName" filled color="deep-purple" label="First Name"
                        :rules="validation.firstName">
                    </v-text-field>
                    <v-text-field class="grow" v-model="lastName" filled color="deep-purple" label="Last Name"
                        :rules="validation.lastName">
                    </v-text-field>
                </div>
                <v-text-field v-model="email" :rules="validation.emailRules" filled color="deep-purple"
                    label="Email Address" type="email">
                </v-text-field>
                <v-switch color="indigo" v-model="emailSwitch" hide-details inset
                    :label="`Trigger emails from Messages`"></v-switch>
            </v-form>
        </div>
    </div>
    <div class="mt-3 md:flex md:flex-row grid grid-cols-6">
        <v-btn size="x-large" color="error" class="mr-2 col-span-3">Reset</v-btn>
        <v-btn size="x-large" color="info" class="col-span-3" :disabled="!valid||response.loading" @click="saveSettings">Save Changes
        </v-btn>
    </div>
    <v-snackbar v-model="response.error">
      Error while processing request. {{response.errorMessage}}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="response.error=false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar v-model="response.success" timeout="3000">
      Successfully updated settings
    </v-snackbar>
</template>

<script lang="ts">
import { Constants, Log, Util } from "@/components/util";
import { defineComponent } from "vue";
import SettingsSevice from './service/SettingsService';
import FileUploader from "@/components/file-uploader/FileUploader";
import Event from '@/components/core/Event';
import SettingsService from "./service/SettingsService";


export default defineComponent({
    data() {
        return {
            valid: false,
            firstName: '',
            lastName: '',
            email: '',
            emailSwitch: false,
            profilePhotoRef: '',
            profilePhotoUrl: 'https://cdn.vuetifyjs.com/images/john.jpg',
            fileUploader: new FileUploader(
                "/file__upload",
                1,
                /.*\.(jpg|jpeg|png)$/,
                1_048_576
            ),

            validation: {
                firstName: [
                    (v: any) => !!v && v.length > 1 || 'First Name is required',
                    (v: any) => !!v && v.length < 100 || 'First Name should not exceed 100'
                ],

                lastName: [
                    (v: any) => !!v && v.length > 1 || 'Last Name is required',
                    (v: any) => !!v && v.length < 100 || 'Last Name should not exceed 100'
                ],

                emailRules: [
                    (v: any) => !!v || 'E-mail is required',
                    (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
            },

            response: {
                loading: false,
                error: false,
                success: false,
                errorMessage: '',
                successMessage: '',
            },
        };
    },


    mounted() {
        let self = this;
        Event.emitter.on(Constants.fileUploadEvent, (data: any) => {
            Log.info(`File Upload Event was received. ${data}`);
            self.profilePhotoRef = data;
        });
        SettingsService.fetchUserSettings(
            (response) => {
                Log.info(`Fetched User Settings: ${JSON.stringify(response.data)}`);

                self.firstName = response.data.firstName;
                self.lastName = response.data.lastName;
                self.email = response.data.email;
                self.profilePhotoRef = response.data.profilePhotoRef;
                self.emailSwitch = response.data.enableEmails;
                self.profilePhotoUrl = response.data.profilePhotoPublicUrl;
            },

            (error) => {

            }
        );
    },


    methods: {

        saveSettings() {
            let self = this;

            this.response.error = false;
            this.response.loading = true;
            this.response.errorMessage = '';

            let settings = {
                "firstName": this.firstName,
                "lastName": this.lastName,
                "email": this.email,
                "profilePhotoRef": this.profilePhotoRef,
                "enableEmails": this.emailSwitch,
            };

            SettingsSevice.saveSettings(
                settings,

                (response: any) => {
                    self.response.loading = false;
                    self.response.success = true;
                },

                (error: any) => {
                    self.response.error = true;
                    self.response.loading = false;
                    self.response.errorMessage = Util.extractError(error);
                },
            );
        },


        selectProfilePhotoToUpload() {
            document.getElementById("profilePhoto")?.click();
        },


        fileChanged(event: any) {
            this.fileUploader.fileChange(event);
        },

        

    }
});
</script>

<style src="@/assets/ext.css" scoped>

</style>
