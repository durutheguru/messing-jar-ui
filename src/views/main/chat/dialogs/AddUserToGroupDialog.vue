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
                    <v-text-field v-model="search" density="compact" variant="underlined"
                        placeholder="Search for user" append-inner-icon="mdi-close" single-line hide-details
                        @click:append-inner="cancelSearch" @input="handleSearch"></v-text-field>


                    <v-card v-show="searchResults.length" min-width="300" class="pb-5">
                        <v-list>
                            <v-list-subheader v-show="searchResults.length">Results...</v-list-subheader>
                            <v-list-item v-for="result in searchResults" :key="result.username"
                                :prepend-avatar="result.profilePhotoUrl" :title="`${fullName(result)}`"
                                :subtitle="result.email" @click="selectUserId(result)">
                            </v-list-item>
                        </v-list>
                    </v-card>
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
import { Log, Util } from '@/components/util';
import SearchService from '../../header/service/SearchService';


declare interface AddUserToGroupDialogData {

    userId: string;
    userFullName: string;
    search: string | null,
    searchResults: Array<any>,
    error: string;
    loading: boolean;

}


export default {

    props: {
        dialog: Boolean,
        groupId: String!,
    },

    data(): AddUserToGroupDialogData {
        return {
            userId: '',
            userFullName: '',
            error: '',
            loading: false,
            search: null,
            searchResults: [],
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

        selectUserId(user: any) {
            Log.info(`Selecting User: ${JSON.stringify(user)}`);

            this.userId = user.userId;
            this.userFullName = this.fullName(user);
            this.searchResults = [];
        },

        fullName(user: any) {
            return `${user.firstName} ${user.lastName}`;
        },

        addUserToGroup() {
            if (!this.groupId) {
                return;
            }

            if (!Util.isValidString(this.userId)) {
                this.error = 'Please select a user to add to the group';
                return;
            }

            if (!Util.isValidString(this.groupId)) {
                this.error = 'Invalid group id';
                return;
            }

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

        cancelSearch() {
            this.search = null;
        },

        handleSearch() {
            let self = this;

            Util.throttle({
                key: 'global-search',
                run: () => {
                    if (self.search == null || !Util.isValidString(self.search)) {
                        return;
                    }

                    SearchService.search(
                        self.search,

                        (response) => {
                            Log.info(`Search Response received: ${JSON.stringify(response)}`);
                            self.searchResults = response.data.userSearchResults;
                        },

                        (error) => {
                            Log.error(`Search Error occurred: ${Util.extractError(error)}`);
                        },
                    );
                },
                timeout: 300
            });
        }

    }


}
</script>

<style></style>

