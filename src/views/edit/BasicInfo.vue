<template>
  <v-container>
  <v-card
    class="mx-auto my-12"
    max-width="600"
    elevation="0"
  >

    <v-card-title>Update your basic info</v-card-title>
    <v-card-text class="px-7">
      <v-form
        ref="form"
        lazy-validation
        v-model="valid"
      >
        <v-text-field label="Full name" v-model="fullName" :rules="[...validation.required]" required />
        <v-text-field label="Email"  :rules="[...validation.required]"  v-model="email" required/>
        <v-text-field label="Phone Number"  v-mask="'###-###-####'" :rules="[...validation.required, ...validation.phone]"  v-model="phone" required/>

      </v-form>
      <v-alert class="login-error-msg" dismissible v-if="this.$store.getters.login.error" color="error" outlined>{{this.$store.getters.login.message}}</v-alert>
    </v-card-text>

    <v-footer>
        <v-btn class="do-login-button mb-4 mt-4" color="success" @click="validate()">Save Changes</v-btn>
    </v-footer>
  </v-card>

  <snackbar :show.sync="snackbarshow" :message="snackbarMessage" :color="snackbarColor" @update-snackbar="(e)=>this.snackbarshow = e"/>
  </v-container>
</template>

<script lang="ts">
  //@ts-ignore
  import Vue from "vue";
  import axios from "axios";
  import router from '@/router';
  import validation from "@/lib/validation.rules";
  import Snackbar from "@/components/Snackbar.vue";

  export default Vue.extend({
    name: "Reset",
    components: {
      Snackbar
    },
    data(){
      return {
        snackbarshow: false, 
        snackbarMessage: "",
        snackbarColor: "red",
        value: true,
        passwordMatch: "",
        valid: true,
        validation: validation
      }
    },
    methods: {
     async validate() {
        // @ts-ignore
        this.valid = this.$refs.form.validate();
        if (this.valid) {
          await this.$store.dispatch('updateUser', {
            user:{fullName: this.fullName, email: this.email, phone: this.phone}, 
            token: this.$store.getters.getToken
          }) 
          .then((res)=>{
            if (res.data.status == 'success'){
              this.snackbarshow = true;
              this.snackbarColor = "green";
              this.snackbarMessage = `saved!`;
            }else{
              this.snackbarshow = true;
              this.snackbarMessage = `The token you are trying to use was not issue for the email ${this.$store.getters.getEmail}`;

            }
        });  
        }
      },      
    },
    computed: {
      fullName: {
        set(val){
          this.$store.commit("setUserInfo",{fullName: val});
        },
        get(){
          return this.$store.state.user.fullName;
        }
      },
      email: {
        set(val){
          this.$store.commit("setUserInfo",{email: val});
        },
        get(){
          return this.$store.state.user.email;
        }
      },
      phone: {
        set(val){
          this.$store.commit("setUserInfo",{phone: val});
        },
        get(){
          return this.$store.state.user.phone;
        }
      },
      graduatingYears() {
        const years = [];
        const num_of_years = 20;
        const first_year = 2020;
        for (let i = first_year; i <= first_year + num_of_years; i++) {
          years.push(i);
        }
        return years;
      },
    },
  });
</script>

<style lang="scss">
  
</style>
