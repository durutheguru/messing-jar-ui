
<template>
    <div class="grid grid-cols-5 gap-2">
        <div class="dashboard-metric-row">
            <dashboard-metric 
                icon="mdi-reply-outline" 
                label="Incoming Messages" 
                :klass="{'bg-[#0284c7]':true}"
                :metrics-object="metricsObject" />

            <dashboard-metric 
                icon="mdi-share-outline" 
                label="Outgoing Messages" 
                :klass="{'bg-[#0369a1]':true}"
                :metrics-object="metricsObject" />

            <dashboard-metric 
                icon="mdi-chat" 
                label="Active Chats" 
                :klass="{'bg-[#075985]':true}"
                :metrics-object="metricsObject" />

            <dashboard-metric 
                icon="mdi-account-multiple-plus-outline" 
                label="Active Groups" 
                :klass="{'bg-[#0c4a6e]':true}"
                :metrics-object="metricsObject" />
        </div>
        <div id="dashboard-recent-activity">o</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DashboardMetric from './components/DashboardMetric.vue';

export default defineComponent({
    components: {
        DashboardMetric,
    },

    data() {
        return {
            metricsObject: [
                {
                    value: 120,
                    label: "Today"
                },
                {
                    value: 90,
                    label: "This Week"
                },
                {
                    value: 228,
                    label: "This Month"
                },
                {
                    value: 12849,
                    label: "This Year"
                },
            ]
        };
    },
});
</script>

<style scoped>

</style>





