<template>
    <line-chart :chart-data="testData" :height="350" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LineChart } from 'vue-chart-3';


export default defineComponent({
    components: {
        LineChart,
    },

    data() {
        return {
            testData: {
                labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
                datasets: [
                    {
                        data: [30, 40, 60, 70, 5],
                        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                    },
                    {
                        data: [4, 90, 1, 12, 5],
                        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                    }
                ],
            },
        };
    }
});
</script>

<style scoped>

</style>
