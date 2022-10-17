<template>

    <v-footer app>
        <div class="w-full grid grid-cols-12 gap-2">
            <div class="py-5 col-span-2 grid grid-cols-3 gap-2">
                <v-btn class="col-span-1" :loading="false" :disabled="false" color="primary" size="small"
                    prepend-icon="mdi-cloud-upload">
                    Upload
                </v-btn>
                <v-btn class="col-span-1" :loading="false" :disabled="false" color="blue-grey" size="small"
                    prepend-icon="mdi-microphone">
                    Voice
                </v-btn>
                <v-btn class="col-span-1" :loading="false" :disabled="false" color="info" size="small"
                    prepend-icon="mdi-camera">
                    Camera
                </v-btn>
            </div>
            <div class="col-span-9">
                <v-textarea placeholder="Message" filled rows="1" row-height="20">
                </v-textarea>
            </div>
            <div class="col-span-1">
                <div class="fill-height">
                    <v-btn block :loading="false" :disabled="false" color="secondary" size="x-large"
                        append-icon="mdi-send">
                        Send
                    </v-btn>
                </div>

            </div>
        </div>
    </v-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'UserChat',


})
</script>

