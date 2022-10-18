<template>
    

    <v-footer elevation="20" app>
        <div class="w-full flex gap-2">
            <div class="py-2 flex-none grid grid-cols-3 gap-2 hidden lg:grid md:hidden sm:hidden">
                <v-btn class="col-span-1 max-height" :loading="false" :disabled="false" color="primary" size="small"
                    prepend-icon="mdi-cloud-upload">
                    Upload
                </v-btn>
                <v-btn class="col-span-1 max-height" :loading="false" :disabled="false" color="blue-grey" size="small"
                    prepend-icon="mdi-microphone">
                    Voice
                </v-btn>
                <v-btn class="col-span-1 max-height" :loading="false" :disabled="false" color="info" size="small"
                    prepend-icon="mdi-camera">
                    Camera
                </v-btn>
            </div>
            <div class="py-2 flex-none grid grid-cols-3 gap-2 lg:hidden md:grid sm:grid">
                <v-btn class="col-span-1" :loading="false" :disabled="false" color="primary" size="small"
                    icon="mdi-cloud-upload">
                </v-btn>
                <v-btn class="col-span-1" :loading="false" :disabled="false" color="blue-grey" size="small"
                    icon="mdi-microphone">
                </v-btn>
                <v-btn class="col-span-1" :loading="false" :disabled="false" color="info" size="small"
                    icon="mdi-camera">
                </v-btn>
            </div>
            <div class="grow max-height">
                <v-textarea class="max-height mt-1" hide-details placeholder="Type your message..." no-resize rows="1" >
                </v-textarea>
            </div>
            <div class="flex-none">
                <div class="fill-height max-height">
                    <div class="lg:block md:hidden sm:hidden hidden max-height">
                        <v-btn class="max-height" block :loading="false" :disabled="false" color="info"
                            append-icon="mdi-send">
                            Send
                        </v-btn>
                    </div>
                    <div class="md:block lg:hidden xl:hidden block">
                        <v-btn block :loading="false" :disabled="false" color="info"
                            icon="mdi-send">
                        </v-btn>
                    </div>
                </div>

            </div>
        </div>
    </v-footer>

</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'ChatFooter',

    });

</script>

<style src="@/assets/ext.css" scoped></style>

