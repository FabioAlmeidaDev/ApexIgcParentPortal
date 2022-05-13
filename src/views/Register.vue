<template>
  <v-container>
    <v-card
      max-width="374"
      class="mx-auto"
      elevation="0"
      outlined
    >
      <v-card-title>
        Let's get you registered.
      </v-card-title>
  
      <v-form ref="parent" lazy-validation v-model="valid">
        <v-card-text>
          <h4>Parent Info</h4>
          <v-text-field label="Parent Full name" v-model="user.fullName" :rules="[...validation.required]" required />
          <v-text-field v-model="user.email" label="Parent Email" :rules="[...validation.required, ...validation.email]" />
          <v-text-field v-model="user.phone" label="Parent Phone Number" :rules="[...validation.required, ...validation.phone]" />
           <h4>Password</h4>
            <v-text-field 
              label="Password" 
              v-model="user.password" 
              :rules="[...validation.required, ...validation.passwordLength]"
              :type="revealPassword ? 'password' : 'text'"
            />
            <v-text-field
             label="Re enter your password"
              :rules="[...validation.required, ...validation.pwdMatchesRules(this.user.password)]"
              :append-icon="revealPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="() => (revealPassword = !revealPassword)"
              :type="revealPassword ? 'password' : 'text'"
            />      
        </v-card-text>
      </v-form>

      <v-form ref="gymnast">
        <v-card-text>
          <h4 class="mt-5">Add one (or more) Gymnast </h4>
            <v-text-field v-model="gymnastTemp.name" label="Gymnast Name" :rules="[...validation.required]"/>
            <v-row>
              <v-col> 
                <v-text-field v-model="gymnastTemp.dob" label="Gymnast DOB" :rules="[...validation.required, ...validation.dob]"/>
              </v-col>
              <v-col>
                <v-select v-model="gymnastTemp.level" label="Gymnast Level" :items="levels"/>
              </v-col>
            </v-row>
            <v-btn color="success" right @click="addGymnast()" :disabled="!gymnastTemp.name || !gymnastTemp.dob || !gymnastTemp.level">
              <v-icon
                left
                dark
              >
                mdi-plus
              </v-icon>
              Add
            </v-btn>
            <div v-if="this.user.gymnasts.length > 0">
              <div v-for="(gymnast, index) in this.user.gymnasts" :key="index" class="mt-3">
                <b>{{gymnast.name}}</b> | {{gymnast.level}} | {{gymnast.dob}}
              </div>
            </div>
        </v-card-text>
      </v-form>
        <v-footer>
          <v-card-actions >
            <v-btn color="info" width="100%" @click="validate()" :disabled="!user.fullName || !user.email || !user.phone || user.gymnasts.length == 0"> Register user </v-btn>
          </v-card-actions>
        </v-footer>
    </v-card>
    <snackbar :show="snackbar" :message="snackbarMessage" color="red"/>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  import axios from "axios";
  //@ts-ignore
  import api from "@/api/server-api";
  import router from '@/router';
  import validation from "@/lib/validation.rules";
  import Snackbar from "@/components/Snackbar.vue";

  export default Vue.extend({
    name: "Register",
    components: {
      Snackbar
    },
    data(){
      return {
        revealPassword: true,
        valid: true ,
        snackbar: false,
        snackbarMessage: "",
        user: {
          fullName:"",
          email:"",
          phone:"",
          accountType:"parent",
          gymnasts: [],
        },
        gymnastTemp: {
          name: "",
          dob: "",
          level: "",
        },
        levels: [
          'Copper 1',
          'Copper 2',
          'Bronze',
          'Diamond',
          'Silver',
          'Gold',
          'Platinum',
          'Premiere',
        ],
        validation: validation
      }
    },
    methods: {
      async validate() {
        // @ts-ignore
        this.valid = this.$refs.parent.validate();
        
        if (this.valid) {
          await this.$store.dispatch('register', this.user) 
          .then((res)=>{
            if (res.data.status == 'success'){
              router.push("/login")
            }else{
              this.snackbar = true;
              this.snackbarMessage = `There was a problem trying to register you at this time. Please verify your information and try again.`;

            }
        });  
        }
      }, 
      addGymnast(){
        if (this.gymnastTemp.name && this.gymnastTemp.dob && this.gymnastTemp.level) {
          this.user.gymnasts.push({
            name: this.gymnastTemp.name.toUpperCase(),
            dob: this.gymnastTemp.dob.toUpperCase(),
            level: this.gymnastTemp.level.toUpperCase(),
          });
          
          this.gymnastTemp.name = '';
          this.gymnastTemp.dob = '';
          this.gymnastTemp.level = '';
          this.$refs.gymnast.reset();
        }
      },
    },
  });
</script>

<style lang="scss">
  .v-flex{
    display: flex;
  }
  .dob-flex-fields >>> input{
    text-align: center;
  }
</style>
