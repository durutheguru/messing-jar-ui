<script lang="ts">

import { defineComponent } from "vue";
import Event from "@/components/core/Event";
import { Constants, Log } from "@/components/util";
import { mapState } from 'pinia';
import authTokenStore from '@/store/modules/authToken';



declare interface WebSocketManagerData {
    ws: WebSocket | null;
}


export default defineComponent({
    name: "WebSocketManager",

    data(): WebSocketManagerData {
        return {
            ws: null,
        };
    },


    computed: {
        ...mapState(authTokenStore, ['username']),
    },


    created() {
        Log.info('Running WebSocketManager created hook')
        Event.emitter.on(
            Constants.webSocketInitializedEvent,

            (event: any) => {
                Log.info(`WebSocket Initialized: ${event}`);
                this.ws = event as WebSocket;
            }
        );

        Event.emitter.on(
            Constants.webSocketOutgoingMessage,

            (event: any) => {
                Log.info(`WebSocket Outgoing Message: ${event}`);
                this.sendMessage(event);
            }
        );
    },

    methods: {

        sendMessage(message: any) {
            if (!this.ws) {
                Log.error("WebSocket is not initialized");
                return;
            }

            this.ws.send(
                JSON.stringify({
                    username: this.username,
                    ...message,
                })
            );
        },

    }
})

</script>
