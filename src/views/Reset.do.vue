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

       <v-text-field
          v-model="password"
          :rules="pwdRules"
          label="Enter your new password"
          required
          :type="value ? 'password' : 'text'"
        ></v-text-field>

        <v-text-field
          v-model="passwordMatch"
          :rules="pwdMatchesRules"
          label="Re-enter the Password"
          required
          :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="() => (value = !value)"
          :type="value ? 'password' : 'text'"
        ></v-text-field>
        <div> After clicking the reset button you will be redirected to the login page to login with your new password</div>
      </v-form>
      <v-alert class="login-error-msg" dismissible v-if="this.$store.getters.login.error" color="error" outlined>{{this.$store.getters.login.message}}</v-alert>
    </v-card-text>
    <v-card-actions class="d-flex">
      <v-btn class="do-login-button mb-7" color="success" @click="validate()">Confirm password change</v-btn>
    </v-card-actions>
    <v-footer>
        <div>Dont have an account yet? <a href="/register"> Click here to register </a></div>
    </v-footer>
  </v-card>
  <snackbar :show="snackbar" :message="snackbarMessage" color="red"/>
  </v-container>
</template>

<script lang="ts">
  //@ts-ignore
  import Vue from "vue";
  import axios from "axios";
  import router from '@/router';
  import Snackbar from "@/components/Snackbar.vue";

  export default Vue.extend({
    name: "Reset",
    components: {
      Snackbar
    },
    data(){
      return {
        snackbar: false, 
        snackbarMessage: "",
        value: true,
        passwordMatch: "",
        valid: true,
        emailRules: [
          (v: any) => !!v || 'E-mail is required',
          (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],   
        pwdRules: [
          (v: any) => !!v || 'Password is required',
        ],
        pwdMatchesRules: [
          (v: any) => {
            return v == this.$store.state.user.password || 'Password does not match'
          },
        ]
      }
    },
    methods: {
     async validate() {
        // @ts-ignore
        this.valid = this.$refs.form.validate();
        const token = this.$route.query.t;
        if (this.valid) {
          await this.$store.dispatch('changePassword', token) 
          .then((res)=>{
            if (res.data.status == 'success'){
              router.push("/")
            }else{
              this.snackbar = true;
              this.snackbarMessage = `The token you are trying to use was not issue for the email ${this.$store.getters.getEmail}`;

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
      },
      password: {
        set(val){
          this.$store.commit("setPassword",val);
        },
        get(){
          return this.$store.state.user.password;
        }
      }
    },
  });
</script>

<style lang="scss">
  
</style>
