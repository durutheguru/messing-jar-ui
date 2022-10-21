
<template>
    <div class="grid grid-cols-5 gap-2 mb-10">
        <div class="dashboard-main-cards">
            <div class="col-span-4 flex flex-col gap-2">
                <div class="dashboard-metrics-row">

                    <dashboard-metric icon="mdi-reply-outline" label="Incoming Messages" :klass="{'bg-[#0284c7]':true}"
                        :metrics-object="metricsObject" />

                    <dashboard-metric icon="mdi-share-outline" label="Outgoing Messages" :klass="{'bg-[#0369a1]':true}"
                        :metrics-object="metricsObject" />

                    <dashboard-metric icon="mdi-chat" label="Active Chats" :klass="{'bg-[#075985]':true}"
                        :metrics-object="metricsObject" />

                    <dashboard-metric icon="mdi-account-multiple-plus-outline" label="Active Groups"
                        :klass="{'bg-[#0c4a6e]':true}" :metrics-object="metricsObject" />

                </div>

                <dashboard-graph />

                <top-messing-jars />
            </div>
        </div>
        <div id="dashboard-side-cards" class="flex flex-col gap-2">
            <dashboard-recent-activity />
            <dashboard-pie />
            <message-stream />
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import DashboardMetric from './components/Metric.vue';
import DashboardRecentActivity from './components/RecentActivity.vue';
import DashboardGraph from './components/Graph.vue';
import DashboardPie from './components/SentimentsPie.vue';
import TopMessingJars from './components/TopMessingJars.vue';
import MessageStream from './components/MessageStream.vue';



export default defineComponent({
    components: {
        DashboardMetric,
        DashboardRecentActivity,
        DashboardGraph,
        DashboardPie,
        TopMessingJars,
        MessageStream,
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
            ],
        };
    },
});
</script>

<style scoped>

</style>





