import GroupService from '@/services/group/GroupService';
import GroupService from '@/services/group/GroupService';
<template>
  
  <v-row justify="center">
        <v-dialog max-width="450" v-model="dialogState" persistent>
            <v-card>
                <v-card-title>
                    <span class="text-h9">Add User To Group</span>
                </v-card-title>
                <v-card-text>
                    
                </v-card-text>
                <v-card-actions>
                    <span class="red">{{ error }}</span>
                    <v-spacer></v-spacer>
                    <v-btn icon="mdi-plus" color="blue-darken-1" variant="text" @click="addUserToGroup()">
                        Add
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
import GroupService from '@/services/group/GroupService';
import { Util } from '@/components/util';


declare interface AddUserToGroupDialogData {

    userId: string;
    groupId: string;
    error: string;
    loading: boolean;

}


export default {

    props: {
        dialog: Boolean,
    },

    data(): AddUserToGroupDialogData {
        return {
            userId: '',
            groupId: '',
            error: '',
            loading: false,
        }
    },
    
    computed: {

        dialogState() {
            return this.dialog;
        },

    },

    methods: {

        closeDialog() {
            this.$emit('close');
        },

        addUserToGroup() {
            this.loading = true;
            this.error = '';
            GroupService.addUserToGroup(
                this.groupId, this.userId, 
                () => {
                    this.loading = false;
                    this.closeDialog();
                },
                (error: any) => {
                    this.loading = false;
                    this.error = Util.extractError(error);
                }
            )
        },

    }


}
</script>

<style>

</style>

