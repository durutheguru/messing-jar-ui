<template>
    <v-card theme="dark" class="p-2">
        <div class="font-weight text-lg ml-2 my-2">
            Sentiments
        </div>

        <pie-chart :chart-data="testData" :height="400" />

        <v-table>
            <tbody>
                <tr>
                    <td>Item 1</td>
                    <td>4%</td>
                </tr>
                <tr>
                    <td>Item 2</td>
                    <td>44%</td>
                </tr>
                <tr>
                    <td>Item 3</td>
                    <td>51%</td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PieChart } from 'vue-chart-3';


export default defineComponent({
    components: {
        PieChart,
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
