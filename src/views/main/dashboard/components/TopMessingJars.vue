<template>
    <v-card id="graph-container" theme="dark" class="p-4">
        <div class="font-weight text-2xl ml-1 mb-2">
            Top MessingJars
        </div>

        <v-table>
            <thead>
                <th></th>
                <th></th>
                <th>In</th>
                <th>Out</th>
                <th>Sentiment</th>
            </thead>
            <tbody>
                <tr class="text-center" v-for="item in desserts" :key="item.name">
                    <td>
                        <v-avatar>
                            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
                        </v-avatar>
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories }}</td>
                    <td>{{ item.calories }}</td>
                    <td>Positive</td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                },
                {
                    name: 'Eclair',
                    calories: 262,
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                }
            ],
        }
    },
});
</script>

