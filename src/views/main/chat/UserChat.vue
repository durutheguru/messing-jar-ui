<template>

    <message-timeline />

    <chat-footer 
        @send-message="sendMessage" />

</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import MessageTimeline from './components/MessageTimeline.vue';
import ChatFooter from './components/ChatFooter.vue';
import { Constants, Log } from '@/components/util';
import { EventTrigger } from '@/components/core/Event';
import { mapState } from 'pinia';
import authTokenStore from '@/store/modules/authToken';




export default defineComponent({
    name: 'UserChat',

    components: {
        ChatFooter,
        MessageTimeline,
    },

    data() {
        return {
            message: '',
        }
    },

    computed: {
        ...mapState(authTokenStore, ['username']),
    },

    mounted() {
        Log.info('UserChat mounted');
        EventTrigger.trigger(
            Constants.webSocketOutgoingMessage, 
            {
                type: "INITIALIZE_CHAT",
                payload: JSON.stringify(
                    {
                        username: this.$route.params.username,
                    }
                )
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
                            to: this.$route.params.username,
                            message,
                        }
                    )
                }
            );

            this.message = '';
        }

    }
})
</script>

<style lang="sass" src="@/assets/ext.css" scoped></style>
