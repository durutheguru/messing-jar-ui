
<template>
    <v-row justify="center">
        <v-dialog max-width="450" v-model="dialogState" persistent>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Add Group</span>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="groupName" label="Group Name" required></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6">
                            <input id="file-upload" autocomplete="off" type="file"
                                accept="image/png, image/jpeg, image/jpg" placeholder="upload file" class="hidden"
                                v-on:change="fileUploaded" />
                            <v-chip v-show="isFileUploadMode" class="ma-2" closable color="cyan" label>
                                <v-icon start icon="mdi-file" @click="removeUploadedFile()"></v-icon>
                                {{ lastUploadedFileName }}
                            </v-chip>
                            <v-btn class="col-span-1 max-height" variant="outlined" :loading="false" :disabled="false"
                                color="primary" size="large" prepend-icon="mdi-cloud-upload" v-show="!isFileUploadMode"
                                @click="selectFileToUpload()">
                                Group Photo
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <span class="red">{{ error }}</span>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="saveGroup()">
                        Save
                    </v-btn>
                    <v-btn color="red" variant="text" @click="closeDialog()">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import FileUploader from '@/components/file-uploader/FileUploader';
import type { FileUploaderConfig } from '@/components/file-uploader/FileUploader';
import GroupService from '@/services/group/GroupService';
import { Log, Util } from '../util';



declare interface AddGroupDialogData {
    groupName: string;
    error: string;
    uploads: any[];
    fileUploader: FileUploader;
    isFileUploadMode: boolean
}


export default {
    props: {
        dialog: Boolean,
    },

    data(): AddGroupDialogData {
        return {
            uploads: [],
            isFileUploadMode: false,
            fileUploader: new FileUploader(
                {
                    uploadUrl: "/file__upload",
                    maxFiles: 1,
                    maxFileSize: 1_048_576,
                } as FileUploaderConfig
            ),
            groupName: "",
            error: "",
        }
    },

    mounted() {
        this.groupName = "";
        this.fileUploader.onSuccess((data: any) => {
            Log.info(`File Upload Success. ${JSON.stringify(data)}`);
            this.uploads.push(data);
            this.isFileUploadMode = true;
        });
    },

    computed: {

        dialogState() {
            return this.dialog;
        },

        lastUploadedFileName(): string {
            return this.uploads.length > 0 ? this.uploads[this.uploads.length - 1].originalFileName : '';
        },

        lastUploadedFileReference(): string {
            return this.uploads.length > 0 ? this.uploads[this.uploads.length - 1].reference : '';
        },

    },

    methods: {

        fileUploaded(event: any) {
            this.fileUploader.fileChange(event);
        },

        selectFileToUpload() {
            document.getElementById("file-upload")?.click();
        },

        closeDialog() {
            this.$emit('close');
        },

        removeUploadedFile() {
            this.uploads = [];
            this.isFileUploadMode = false;
            this.fileUploader.removeAllFiles();
        },

        saveGroup() {
            this.error = "";
            GroupService.saveGroup(
                {
                    name: this.groupName,
                    iconImageRef: this.lastUploadedFileReference,
                },

                () => {
                    this.closeDialog();
                },

                (error: any) => {
                    this.error = Util.extractError(error);
                }
            );
        }
    }
}
</script>




