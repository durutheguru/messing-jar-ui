<template>
    <div class="dashboard-metric max-h-20 text-white" :class="metricsComponentKlass">
        <div class="flex">
            <div class="flex-none">
                <v-btn class="ma-2" color="indigo" :icon="icon"></v-btn>
            </div>
            <div class="grow flex flex-col">
                <div class="mb-1">
                    <span class="text-3xl" v-text="selectedInterval.value"></span>
                    <span class="float-right mt-1 text-white text-xs text-green-800">
                        <span v-text="selectedInterval.label"></span>
                        <v-btn size="x-small" density="compact" class="m-0 pb-5" variant="text">
                            ...

                            <v-menu location="start" activator="parent">
                                <v-list>
                                    <v-list-item 
                                        v-for="(item, index) in metricsObject" 
                                        :key="index" :value="item.label" 
                                        @click="setSelectedInterval(item)">
                                        <span v-text="item.label"></span>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-btn>
                    </span>
                </div>
                <div class="text-xs" v-text="label">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Log } from "@/components/util";
import { defineComponent, onMounted } from "vue";

export default defineComponent({

    props: {
        icon: String,
        label: String,
        klass: Object,
        metricsObject: Object,
    },

    data() {
        return {
            metricsObject: [
                {
                    value: 120,
                    label: "Today"
                },
                {
                    value: 900,
                    label: "This Week"
                },
                {
                    value: 2289,
                    label: "This Month"
                },
                {
                    value: 12849,
                    label: "This Year"
                },
            ],
            selectedInterval: {
                value: 0,
                label: ""
            },
        };
    },

    methods: {

        setSelectedInterval(interval: any) {
            this.selectedInterval = interval;
        },
        
    },

    mounted() {
        Log.info("Setting Default selected interval.");
        this.setSelectedInterval(this.metricsObject[0]);
    },

    computed: {

        selectedIntervalLabel() {
            return this.selectedInterval ? this.selectedInterval.label : '';
        },

        metricsComponentKlass() {
            return this.klass;
        }

    }

});
</script>

<style scoped></style>
