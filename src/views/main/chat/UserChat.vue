<template>

    <message-timeline />

    <chat-footer />

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MessageTimeline from './components/MessageTimeline.vue';
import ChatFooter from './components/ChatFooter.vue';


export default defineComponent({
    name: 'UserChat',

    components: {
        ChatFooter,
        MessageTimeline,
    },
})
</script>

<style lang="sass" src="@/assets/ext.css" scoped></style>
