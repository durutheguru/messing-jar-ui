<template>
    
    <v-footer elevation="20" app>
        <div class="w-full flex gap-2">
            <input
                id="file-upload"
                autocomplete="off"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                placeholder="upload file"
                class="hidden"
                v-on:change="fileUploaded"
            />
            <div class="py-2 flex-none grid grid-cols-3 gap-2 hidden lg:grid md:hidden sm:hidden">
                <v-btn class="col-span-1 max-height" :loading="false" :disabled="false" color="primary" size="small"
                    prepend-icon="mdi-cloud-upload" @click="selectFileToUpload()">
                    Upload
                </v-btn>
                <v-btn class="col-span-1 max-height" :loading="false" :disabled="false" color="blue-grey" size="small"
                    prepend-icon="mdi-microphone">
                    Voice
                </v-btn>
                <v-btn class="col-span-1 max-height" :loading="false" :disabled="false" color="info" size="small"
                    prepend-icon="mdi-camera">
                    Camera
                </v-btn>
            </div>
            <div class="py-2 flex-none grid grid-cols-3 gap-2 lg:hidden md:grid sm:grid">
                <v-btn class="col-span-1" :loading="false" :disabled="false" color="primary" size="small" icon  @click="selectFileToUpload()">
                    <v-tooltip activator="parent" location="top">Upload</v-tooltip>
                    <v-icon>mdi-cloud-upload</v-icon>
                </v-btn>
                <v-btn class="col-span-1" :loading="false" :disabled="false" color="blue-grey" size="small"
                    icon>
                    <v-tooltip activator="parent" location="top">Voice Recording</v-tooltip>
                    <v-icon>mdi-microphone</v-icon>
                </v-btn>
                <v-btn class="col-span-1" :loading="false" :disabled="false" color="info" size="small" icon>
                    <v-tooltip activator="parent" location="top">Camera</v-tooltip>
                    <v-icon>mdi-camera</v-icon>
                </v-btn>
            </div>
            <div class="grow max-height">
                <v-chip v-show="isFileUploadMode"
                    class="ma-2"
                    closable
                    color="cyan"
                    label>
                    <v-icon start icon="mdi-file" @click="removeUploadedFile()"></v-icon>
                    {{lastUploadedFileName}}
                </v-chip>
                <v-textarea v-show="!isFileUploadMode"
                    class="max-height mt-1" 
                    placeholder="Message..." 
                    no-resize rows="1"
                    v-model="message">
                </v-textarea>
            </div>
            <div class="flex-none">
                <div class="fill-height max-height">
                    <div class="lg:block md:hidden sm:hidden hidden max-height">
                        <v-btn class="max-height" block :loading="false" :disabled="false" color="info"
                            append-icon="mdi-send" @click="sendMessage()">
                            Send
                        </v-btn>
                    </div>
                    <div class="md:block lg:hidden xl:hidden block">
                        <v-btn block :loading="false" :disabled="false" @click="sendMessage()" color="info"
                            icon>
                            <v-tooltip activator="parent" location="top">Send</v-tooltip>
                            <v-icon>mdi-send</v-icon>
                        </v-btn>
                    </div>
                </div>

            </div>
        </div>
    </v-footer>

</template>

<script lang="ts">
    import FileUploader from '@/components/file-uploader/FileUploader';
    import type { FileUploaderConfig } from '@/components/file-uploader/FileUploader';
    import Event from '@/components/core/Event';
    import { defineComponent } from 'vue';
    import { Constants, Log } from '@/components/util';


    declare interface ChatFooterData {
        message: string;
        uploads: any[];
        fileUploader: FileUploader;
        isFileUploadMode: boolean
    }



    export default defineComponent({
        name: 'ChatFooter',

        data(): ChatFooterData {
            return {
                message: '',
                uploads: [],
                isFileUploadMode: false,
                fileUploader: new FileUploader(
                    {
                        uploadUrl: "/file__upload",
                        maxFiles: 1,
                        maxFileSize: 1_048_576,
                    } as FileUploaderConfig
                )
            }
        },

        mounted() {
            this.fileUploader.onSuccess((data: any) => {
                Log.info(`File Upload Success. ${JSON.stringify(data)}`);
                this.uploads.push(data);
                this.isFileUploadMode = true;
            });
        },

        computed: {

            lastUploadedFileName(): string {
                return this.uploads.length > 0 ? this.uploads[this.uploads.length - 1].originalFileName : '';
            },

            lastUploadedFileReference(): string {
                return this.uploads.length > 0 ? this.uploads[this.uploads.length - 1].reference : '';
            },

        },

        methods: {

            sendMessage() {
                if (this.isFileUploadMode) {
                    this.$emit('send-file-message', this.lastUploadedFileReference);
                    this.removeUploadedFile();
                }
                else {
                    this.$emit('send-text-message', this.message);
                    this.clearMessage();
                }
            },

            clearMessage() {
                this.message = '';
            },

            fileUploaded(event: any) {
                this.fileUploader.fileChange(event);
            },

            selectFileToUpload() {
                document.getElementById("file-upload")?.click();
            },

            removeUploadedFile() {
                this.uploads = [];
                this.isFileUploadMode = false;
                this.fileUploader.removeAllFiles();
            },

        },
    });

</script>

<style src="@/assets/ext.css" scoped></style>

