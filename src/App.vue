<template>
  <v-app>
    <v-app-bar app color="black darken-5" dark>
      <div class="d-flex align-center app-header">
        <div class="app-name-and-logo">
          <h2 class="main-title">Apex IGC - Parent Portal</h2>
        </div>

        <div class="app-action-button-group">
          <v-btn outlined dark v-if="!$store.getters.getToken" @click="$router.push('/login')">
            <v-icon left dark>mdi-login</v-icon> Login           
          </v-btn>
          <v-btn outlined dark v-if="$store.getters.getToken" @click.stop="settingsDrawer = !settingsDrawer" class="ml-2"> 
            <v-icon left dark>mdi-account</v-icon> Profile 
          </v-btn>
        </div>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="settingsDrawer"
      absolute
      right
      temporary
      
    >
      
      <edit-list-item-avatar/>
      
      <v-list
        nav
        dense
        v-if="this.$store.state.user.accountType == 'parent'"
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <edit-list-item icon="mdi-view-grid-plus" label="Attendance Log" route="manage_skills"/>
          <edit-list-item icon="mdi-trending-up" label="Progress Log" route="manage_skills"/>
          <edit-list-item icon="mdi-message" label="Messages" route="manage_skills"/>
          <edit-list-item icon="mdi-hospital" label="Incident Log" route="videos"/>
          <v-divider class="mt-5 mb-5"/>
          <edit-list-item icon="mdi-counter" label="Meet Scores" route="edit/scores"/>
          <v-divider class="mt-5 mb-5"/>
          <edit-list-item icon="mdi-account" label="Edit Info" route="edit/basic"/>
          <edit-list-item icon="mdi-account" label="Add | Remove Gymnast" route="edit/addremovegymnast"/>
          <v-divider class="mt-5 mb-5"/>
          <v-list-item @click="$store.dispatch('logout')">
              <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import Vue from "vue";
  import EditListItem from "./components/Edit.ListItem.vue";
  import EditListItemAvatar from "./components/Edit.Avatar.vue";

  export default Vue.extend({
    name: "App",

    components: {
      EditListItem,
      EditListItemAvatar
    },

    data: () => ({
      settingsDrawer: false,
      group: null
      //
    }),
    watch: {
      group () {
        this.settingsDrawer = false
      },
    },
  });
</script>
<style lang="scss">
  @media screen and (max-width: 527px) {
    .main-title {
      font-size: 1rem;
    }
  }
  .app-header{
    width:100%;
  }
  .app-name-and-logo, .app-action-button-group{
    flex: 1;
    display: flex;
  }
  .app-action-button-group{
    justify-content: flex-end;
  }
</style>
