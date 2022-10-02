
<template>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Log } from '@/components/util/';

export default defineComponent({
    setup() {
        
    },

    mounted() {
        Log.info(`OAuth Redirected...Code: ${this.$route.query.code}`);
    }
})
</script>
