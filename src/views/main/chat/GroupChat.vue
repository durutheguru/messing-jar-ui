<template>

    <v-banner
      lines="one"
      color="deep-purple-accent-4"
      class="my-4"
      v-if="groupDataResult"
    >
      <v-banner-text>
        <div class="text-3xl">
            {{ groupDataResult.fetchGroupDetails.name }}
        </div>
        <div class="lg:text-lg grid grid-cols-5 md:grid-cols-6 lg:grid-cols-12">
            <div class="col-span-1 md:col-span-1 lg:col-span-1 h-full grow md:pt-4 pt-4">
                <span class=" h-full">
                    {{ quantity(groupDataResult.fetchGroupDetails.memberCount, 'member') }}
                </span>
            </div>
            <div class="col-span-4 md:col-span-5 lg:col-span-11 pl-5 pr-1">
                <v-list class="flex flex-row gap-0">
                    <v-list-item style="padding:0px;" v-for="(member, index) in groupDataResult.fetchGroupMembers" :key="index">
                        <v-img :src="member.imageUrl" :width="30">
                            <v-tooltip activator="parent" location="top">
                                {{ member.fullName }}
                            </v-tooltip>
                        </v-img>
                    </v-list-item>
                </v-list>
            </div>
        </div>
      </v-banner-text>

      <template v-slot:actions>
        <v-btn @click="showAddUserToGroupDialog = true">Add User</v-btn>
      </template>
    </v-banner>

    <group-message-timeline 
        :user="username" 
        :history="messageHistory"
        style="margin-top:9em" />

    <chat-footer 
        @send-text-message="sendTextMessage"
        @send-file-message="sendFileMessage" />

    <add-user-to-group-dialog 
        :group-id="groupId"
        v-bind:dialog="showAddUserToGroupDialog" v-on:close="showAddUserToGroupDialog = false"
    />

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Ref } from 'vue';
import GroupMessageTimeline from './components/GroupMessageTimeline.vue';
import ChatFooter from './components/ChatFooter.vue';
import { mapState } from 'pinia';
import authTokenStore from '@/store/modules/authToken';
import { fetchGroupChatData } from '@/views/main/chat/services/group-chat-data.query';
import { useQuery } from '@vue/apollo-composable';
import type { ApolloError } from 'apollo-client';
import { Constants, Log, Util } from '@/components/util';
import AddUserToGroupDialog from './dialogs/AddUserToGroupDialog.vue';
import { EventTrigger } from '@/components/core/Event';
import Event from "@/components/core/Event";


declare interface GroupChatData {
    message: string;
    messageHistory: any[];
    myDetails: any;
    otherUsersDetails: any;
    groupDataResult: Ref<any>,
    groupDataLoading: Ref<boolean>,
    groupDataError: Ref<ApolloError | null>,
    groupDataRefetch: any,
    showAddUserToGroupDialog: boolean,
}



export default defineComponent({
    name: 'GroupChat',

    components: {
        ChatFooter,
        GroupMessageTimeline,
        AddUserToGroupDialog
    },

    data(): GroupChatData {
        const { result, loading, error, refetch } = useQuery(
            fetchGroupChatData, 
            { groupId: this.$route.params.groupId }
        );

        return {
            message: '',
            messageHistory: [],
            myDetails: {},
            otherUsersDetails: [],
            groupDataResult: result,
            groupDataLoading: loading,
            groupDataError: error,
            groupDataRefetch: refetch,
            showAddUserToGroupDialog: false,
        };
    },

    computed: {
        ...mapState(authTokenStore, ['username']),

        groupId: function() {
            let groupId = this.$route.params.groupId;
            return groupId instanceof Array<string> ? groupId[0] : groupId;
        },
        
    },

    mounted() {
        Log.info('Group Chat mounted');
        EventTrigger.trigger(
            Constants.webSocketOutgoingMessage,
            {
                type: "INITIALIZE_GROUP",
                payload: JSON.stringify(
                    {
                        groupId: this.groupId,
                    }
                )
            }
        );

        Event.emitter.on(
            Constants.webSocketNewGroupMessage,
            (event: any) => {
                Log.info(`WebSocket Chat Message: ${JSON.stringify(event)}`);
                this.handleIncomingGroupMessageEvent(event);
            },
        );

        Event.emitter.on(
            Constants.webSocketGroupHistory,
            (event: any) => {
                Log.info(`WebSocket Chat History: ${JSON.stringify(event)}`);
                this.handleIncomingGroupChatHistory(event);
            },
        );
    },

    methods: {
        
        quantity(n: number, item: string) {
            return Util.quantity(n, item, true);
        },

        handleIncomingGroupChatHistory(event: any) {
            Log.info('Handling Incoming Group Chat History');
            var data = JSON.parse(event.message);

            this.myDetails = data.initiatorDetails;
            this.otherUsersDetails = data.otherMembersDetails;
            this.messageHistory = [];
            this.messageHistory.push(...data.history);
        },

        handleIncomingGroupMessageEvent(event: any) {
            Log.info('Handling Incoming Group Message Event');
            var message = Util.extractWSMessage(event);

            Log.info(`Final Message: ${JSON.stringify(message)}`);
            if (message.groupId === this.groupId) {
                this.messageHistory.push(message);
            }
        },

        sendTextMessage(message: string) {
            this.sendMessage(message, "TEXT");
        },


        sendFileMessage(message: any) {
            this.sendMessage(message, "FILE");
        },


        sendMessage(message: any, type: String) {
            Log.info(`Sending ${type} message`);
            EventTrigger.trigger(
                Constants.webSocketOutgoingMessage, 
                {
                    type: "GROUP_MESSAGE",
                    payload: JSON.stringify(
                        {
                            groupId: this.groupId,
                            message,
                            type,
                        },
                    )
                }
            );

            this.message = '';
        },

    },
})
</script>

<style lang="sass" src="@/assets/ext.css" scoped></style>
