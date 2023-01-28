<template>

    <message-timeline :user="username" :history="messageHistory" />

    <chat-footer @send-message="sendMessage" />

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
    },

    methods: {

        sendMessage(message: string) {
            Log.info('Sending chat message');
            EventTrigger.trigger(
                Constants.webSocketOutgoingMessage, 
                {
                    type: "CHAT_MESSAGE",
                    payload: JSON.stringify(
                        {
                            to: this.otherUser,
                            message,
                        }
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
        },

    }
})
</script>

<style lang="sass" src="@/assets/ext.css" scoped></style>
