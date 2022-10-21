<template>
    <div>
        <v-card>
            <v-card-text>
                <div class="font-weight text-lg ml-1 mb-2">
                    Message Stream
                </div>

                <v-timeline density="compact">
                    <v-timeline-item v-for="message in messages" :key="message.time" dot-color="black" 
                        size="x-small">
                        <div class="flex text-xs">
                            <span class="grow">
                                {{ message.message }}. <span class="flex-none text-blue-500">5 mins</span>
                            </span>

                        </div>
                    </v-timeline-item>
                </v-timeline>
            </v-card-text>
        </v-card>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            messages: [
                {
                    from: 'You',
                    message: `Sure, I'll see you later.`,
                    time: '10:42am',
                    color: 'deep-purple lighten-1',
                },
                {
                    from: 'John Doe',
                    message: 'Yeah, sure. Does 1:00pm work?',
                    time: '10:37am',
                    color: 'green',
                },
                {
                    from: 'You',
                    message: 'Did you still want to grab lunch today?',
                    time: '9:47am',
                    color: 'deep-purple lighten-1',
                },
                {
                    from: 'John Doe',
                    message: 'Yeah, sure. Does 1:00pm work?',
                    time: '10:37am',
                    color: 'green',
                },
                {
                    from: 'You',
                    message: 'Did you still want to grab lunch today?',
                    time: '9:47am',
                    color: 'deep-purple lighten-1',
                },
            ]
        }
    }
});
</script>

<style scoped>

</style>