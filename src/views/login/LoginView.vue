<template>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="username"
      :counter="10"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
        type="password"
      v-model="password"
      label="E-mail"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="login"
    >
      Login
    </v-btn>
  </v-form>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { Log } from '@/components/util/';

export default defineComponent({
    name: 'LoginView',

    data() {
        return {
            valid: false,
            username: '',
            password: ''
        };
    },

    login() {
        Log.info('Login Activated');
    }
});
</script>
  