<template>

    <message-timeline 
        :user="username" 
        :history="messageHistory"
        :my-details="myDetails"
        :other-user-details="otherUserDetails" />

    <chat-footer 
        @send-text-message="sendTextMessage"
        @send-file-message="sendFileMessage" />

</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import MessageTimeline from './components/MessageTimeline.vue';
import ChatFooter from './components/ChatFooter.vue';
import { Constants, Log, Util } from '@/components/util';
import { EventTrigger } from '@/components/core/Event';
import { mapState } from 'pinia';
import authTokenStore from '@/store/modules/authToken';
import Event from "@/components/core/Event";


export interface UserChatData {
    message: string;
    messageHistory: any[];
    otherUser: string;
    myDetails: any;
    otherUserDetails: any;
}


export default defineComponent({
    name: 'UserChat',

    components: {
        ChatFooter,
        MessageTimeline,
    },

    data(): UserChatData {
        return {
            otherUser: '',
            message: '',
            messageHistory: [],
            myDetails: {},
            otherUserDetails: {},
        }
    },

    computed: {
        ...mapState(authTokenStore, ['username']),
    },

    mounted() {
        Log.info('UserChat mounted');
        this.otherUser = this.$route.params.username as string
        EventTrigger.trigger(
            Constants.webSocketOutgoingMessage, 
            {
                type: "INITIALIZE_CHAT",
                payload: JSON.stringify(
                    {
                        username: this.otherUser,
                    }
                )
            }
        );

        Event.emitter.on(
            Constants.webSocketNewChatMessage,
            (event: any) => {
                Log.info(`WebSocket Chat Message: ${JSON.stringify(event)}`);
                this.handleIncomingChatEvent(event);
            }
        );

        Event.emitter.on(
            Constants.webSocketChatHistory,
            (event: any) => {
                Log.info(`WebSocket Chat History: ${JSON.stringify(event)}`);
                this.handleIncomingChatHistory(event);
            }
        );
    },

    methods: {

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
                    type: "CHAT_MESSAGE",
                    payload: JSON.stringify(
                        {
                            to: this.otherUser,
                            message,
                            type,
                        },
                    )
                }
            );

            this.message = '';
        },

        handleIncomingChatEvent(event: any) {
            Log.info('Handling incoming chat message');
            var message = Util.extractWSMessage(event);

            Log.info(`Final Message: ${JSON.stringify(message)}`);
            if ([message.from, message.to].includes(this.otherUser)) {
                Log.info(`New Message with User ${this.otherUser}`)
                this.messageHistory.push(message);
            }
            this.scrollBottom();
        },

        handleIncomingChatHistory(event: any) {
            Log.info('Handling incoming chat history');
            var data = JSON.parse(event.message);

            this.myDetails = data.initiatorDetails;
            this.otherUserDetails = data.receiverDetails;

            this.messageHistory = [];
            this.messageHistory.push(...data.history);

            this.scrollBottom();
        },

        scrollBottom() {
            let element = document.getElementById("route-container");

            if (element) {
                Log.info('Scrolling to bottom');
                element.scrollTop = element.scrollHeight;
            }
        }

    }
})
</script>

<style lang="sass" src="@/assets/ext.css" scoped></style>
