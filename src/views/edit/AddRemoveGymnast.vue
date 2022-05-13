<template>
  <v-container>
  <v-card
    class="mx-auto my-12"
    max-width="600"
    elevation="0"
  >

    <v-card-title>Add or Remove your gymnasts </v-card-title>
    <v-card-subtitle>
      You will only receive email notifications and have access to informations for the children listed here under <b>approved</b> status.
    </v-card-subtitle>
    <v-card-text class="px-7">
      <v-btn @click="toggleAddUser()" color="info" elevation="0" class="mb-5"> Click here to add another child</v-btn>
      <div v-for="(child, index) in this.$store.state.user.gymnasts" :key="index" class="child-tile">
        <v-chip outlined small color="red" label v-if="!child.enabled">pending</v-chip>
        <v-chip outlined small color="green" label v-if="child.enabled">approved</v-chip>
        <v-row>
          <v-col cols="10">
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="child.name" hide-details class="pt-0 mt-0"></v-text-field>
              </v-col>
    
              <v-col cols="3">
                <v-select v-model="child.level" :items="levels" class="pt-0 mt-0" hide-details></v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="child.dob" class="pt-0 mt-0" hide-details></v-text-field>
              </v-col>
            </v-row>
            <v-text-field hide-details label="My meet scores url" v-model="child.meetScoreUrl" class="pt-0 mt-1"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn  outlined color="green" dark small class="action-button" @click="saveChild(child)">
              save
            </v-btn>
            <v-btn  outlined color="red" dark small class="mt-5 action-button" @click="deleteChild(child._id)">
              delete 
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card-text>

  </v-card>

  <snackbar :show.sync="snackbarshow" :message="snackbarMessage" :color="snackbarColor" @update-snackbar="(e)=>this.snackbarshow = e"/>

    <v-dialog v-model="showAddUser" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add Child to your profile
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-row>
              <v-col>
                <v-row>
                  <v-col cols="6">
                    <v-text-field label="Child Name" v-model="addChild.name" class="pt-0 mt-0"  :rules="[...validation.required]"></v-text-field>
                  </v-col>
        
                  <v-col cols="3">
                    <v-select label="Level" v-model="addChild.level" :items="levels" class="pt-0 mt-0" :rules="[...validation.required]"></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field label="dob"  v-model="addChild.dob" class="pt-0 mt-0"  :rules="[...validation.dob]"></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field hide-details label="My meet scores url" v-model="addChild.meetScoreUrl" class="pt-0 mt-1"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="cancelAddUser()"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green"
            text
            @click="validate()"
          >
            Add Child
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
  //@ts-ignore
  import Vue from "vue";
  import axios from "axios";
  import validation from "@/lib/validation.rules";
  import Snackbar from "@/components/Snackbar.vue";

  export default Vue.extend({
    name: "Reset",
    components: {
      Snackbar
    },
    data(){
      return {
        showAddUser: false,
        snackbarshow: false, 
        snackbarMessage: "",
        snackbarColor: "red",
        value: true,
        passwordMatch: "",
        valid: true,
        validation: validation,
        levels: [
          'COPPER 1',
          'COPPER 2',
          'BRONZE',
          'DIAMOND',
          'SILVER',
          'GOLD',
          'PLATINUM',
          'PREMIERE',
        ],
        addChild: {
        },
      }
    },
    methods: {
    async validate() {
        // @ts-ignore
        this.valid = this.$refs.form.validate();
        if (this.valid) {
          await this.$store.dispatch('addChild', {user: {...this.addChild}, 
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

            this.addChild= {};
            this.$refs.form.reset();
            this.showAddUser= false;


        });  
        }
    }, 
    async deleteChild(id) {
      await this.$store.dispatch('deleteChild', { token: this.$store.getters.getToken, id });
    },
    async saveChild(child) {
      const res = await this.$store.dispatch('saveChild', { token: this.$store.getters.getToken, child });
      if (res.data.status == 'success'){
              this.snackbarshow = true;
              this.snackbarColor = "green";
              this.snackbarMessage = `saved!`;
            }else{
              this.snackbarshow = true;
              this.snackbarMessage = `The token you are trying to use was not issue for the email ${this.$store.getters.getEmail}`;
            }
    },
    toggleAddUser() {
      this.showAddUser = !this.showAddUser;
    },
    },
  });
</script>

<style lang="scss">
  .child-tile {
    border: 1px solid #EFEFEF;
    border-left: 3px solid #369;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 0.25rem;  

  }
  .action-button {
    width: 100%;
  }
</style>
