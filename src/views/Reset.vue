<template>
  <v-container>
    <v-card 
     elevation="0"
     class="mx-auto my-12 text-center"
     max-width="374"
    >
      Remembered your password? <v-btn href="/login" elevation="0" color="info" text>Click here to login </v-btn>
    </v-card>

  <v-card
    class="mx-auto my-12"
    max-width="374"
    v-if="!foundEmail"
    outlined
  >
    <v-card-title>Let's reset your password!</v-card-title>
    <v-card-text class="px-7">
      <v-form
        ref="form"
        lazy-validation
        v-model="valid"
      >
      <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          append-icon="mdi-at"
          type="email"
      ></v-text-field>

      <div> Enter your e-mail in the field above. If we find the e-mail you entered in our database, we will send you an e-mail with instructions on how to reset your password. <b> You will have 15 minutes to complete the password reset</b></div>
      </v-form>
      <v-alert class="login-error-msg" dismissible v-if="this.$store.getters.login.error" color="error" outlined>{{this.$store.getters.login.message}}</v-alert>
    </v-card-text>
    <v-card-actions class="d-flex">
      <v-btn class="do-login-button mb-7" color="success" @click="validate()">Request password reset</v-btn>
    </v-card-actions>
    <v-footer>
        <div>Dont have an account yet? <a href="/register"> Click here to register </a></div>
    </v-footer>
  </v-card>

  <v-alert color="green" class="lighten-4 mx-auto my-12 text-center" max-width="374" v-if="this.foundEmail">
    {{this.success_message}}
    <p><a href="/">Click here</a> to continue to the homepage</p>
  </v-alert>
  <snackbar :show="snackbar" :message="snackbarMessage" color="red"/>
  </v-container>
</template>

<script lang="ts">
  //@ts-ignore
  import Vue from "vue";
  import axios from "axios";
  import Snackbar from "@/components/Snackbar.vue";

  export default Vue.extend({
    name: "Reset",
    components: {
      Snackbar
    },
    data: () => ({
      foundEmail: false,
      success_message: "",
      snackbar: false,
      snackbarMessage: "",
      valid: true,
      emailRules: [
        (v: any) => !!v || 'E-mail is required',
        (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],      
    }),
    methods: {
     async validate() {
        // @ts-ignore
        this.valid = this.$refs.form.validate();
        if (this.valid) {
          await this.$store.dispatch('reset')
          .then((res)=>{
            if (res.data.status == 'success'){
              this.foundEmail = true;
              this.success_message = `We have sent an email to ${this.email} with instructions on how to reset your password`;
            }else{
              this.snackbar = true;
              this.snackbarMessage = `the email ${this.$store.state.user.email} is not in our database. Please verify you have the correct email and try again.`;
              this.$store.commit("setEmail","");
            }
        });  
        }
      },      
    },
    computed: {
      email: {
        set(val){
          this.$store.commit("setEmail",val);
        },
        get(){
          return this.$store.state.user.email;
        }
      }      
    },
  });
</script>

<style lang="scss">
  
</style>
