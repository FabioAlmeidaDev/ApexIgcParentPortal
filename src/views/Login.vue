<template>
<div>
<!-- Not yet logged in -->
  <v-card 
    elevation="0"
    class="mx-auto my-12"
    max-width="374"
  >
    New User? <a href="/register"> Click here to Register </a>
  </v-card>

  <v-card
    class="mx-auto my-12"
    max-width="374"
    outlined
  >
    <v-card-title>Hello There!</v-card-title>
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
          label="Password"
          required
          :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="() => (value = !value)"
          :type="value ? 'password' : 'text'"
        ></v-text-field>
      </v-form>
      <v-alert class="login-error-msg" dismissible v-if="this.$store.getters.login.error" color="error" outlined>{{this.$store.getters.login.message}}</v-alert>
    </v-card-text>
    <v-card-actions class="d-flex">
      <v-btn class="do-login-button mb-7" color="success" @click="validate()">Login</v-btn>
    </v-card-actions>
    <v-footer>
        Having trouble logging in? <a href="/reset"> Click here to reset your password </a>
    </v-footer>
  </v-card>

</div>
</template>

<script>
  // @ is an alias to /src
  //@ts-ignore
  import api from "@/api/server-api";
  export default {
    name: "Login",
    data: () => ({
      valid: true,
      value: true,
      pwdRules: [
        v => !!v || 'Password is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }),
    components: {},
    methods: {
      validate() {
        // @ts-ignore
        this.valid = this.$refs.form.validate();
        if (this.valid) {
          this.$store.dispatch('signin', this.$route.query.redirect);
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
    }
    
  };
</script>

<style lang="scss">
  .do-login-button {
    flex:1;
  }
  .login-error-msg{
    font-size: 0.8rem !important;
  }
</style>