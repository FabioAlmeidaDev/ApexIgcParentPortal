<template>
  <div class="home container">
    <h1> Manage Skills List</h1>

    <v-card class="mb-5 mt-5 px-5">
      <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="2"
          >
            <v-text-field
              v-model="formData.event"
              label="Event"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="2"
          >
            <v-text-field
              v-model="formData.group"
              label="Group"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="3"
          >
            <v-text-field
              v-model="formData.name"
              label="Name"
              required
            ></v-text-field>
          </v-col>

        <v-col
            cols="12"
            md="1"
          >
            <v-text-field
              v-model="formData.vp"
              label="Value Part"
              required
            ></v-text-field>
          </v-col>

        <v-col
            cols="12"
            md="3"
          >
            <v-text-field
              v-model="formData.tags"
              label="Tags"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="1"
          >
            <v-btn @click="this.addSkill">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      </v-form>
    </v-card>

    <v-data-table
      :headers="headers"
      :items="this.$store.getters.getSkillList('all')"
      :items-per-page="25"
      :search="search"
      class="elevation-1 pt-3"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search by event, value, skill name or tags"
          class="mx-4 my-4"
        ></v-text-field>
      </template>

      <template v-slot:item.vp="{ item }">
        <v-avatar
          v-if="item.vp"
          :color="color(item.vp)"
          size="36"
        >
        <span class="white--text">{{item.vp}}</span>
      </v-avatar>
      </template>

      <template v-slot:item.name="{ item }">
        <div>{{item.name}}</div>
        <small>{{item.group}}</small>
      </template>

      <template v-slot:item.tags="{ item }">
        <tags :tags="item.tags"/>
      </template>

      <template v-slot:item.action="{ item }">
        <v-btn type="primary" elevation="1" class="mr-2" @click="editSkill(item)">
          <v-icon color="indigo" small>
            mdi-playlist-edit
          </v-icon>
        </v-btn>

        <v-btn type="primary" elevation="1" @click="deleteSkill(item._id)">
          <v-icon color="red" small>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>


    <v-dialog
      v-model="showEditModal"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Edit Skill
        </v-card-title>

        <v-card-text>
          <v-text-field
              v-model="skillToChangeInfo.event"
              label="Event"
              required
            ></v-text-field>
            <v-text-field
              v-model="skillToChangeInfo.group"
              label="Group"
              required
            ></v-text-field>
            <v-text-field
              v-model="skillToChangeInfo.name"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="skillToChangeInfo.vp"
              label="Value"
              required
            ></v-text-field>
            <v-text-field
              v-model="skillToChangeInfo.tags"
              label="Tags"
              required
            ></v-text-field>                                    
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey darken-1"
            text
            @click="showEditModal = false"
          >
            Discard
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="saveEditedChanges()"
          >
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import Tags from "@/components/Tags";
import {color} from "@/lib/colors";

export default {
  name: 'ManageSkillsList',
  components: {
    Tags
  },
  data: () => ({
    search: '',
    showEditModal: false,
    skillToChangeInfo: {
      event: '',
      group: '',
      name: '',
      tags: '',
      vp: '',
      id: ''
    },
    headers: [
      {
        text: 'Event',
        align: 'start',
        sortable: true,
        value: 'event',
      },
      
      {
        text: 'Value',
        align: 'center',
        sortable: true,
        value: 'vp',
      },
      {
        text: 'Name',
        align: 'start',
        sortable: true,
        value: 'name',
      },
      {
        text: 'Tags',
        align: 'start',
        sortable: false,
        value: 'tags',
      },
            {
        text: 'Action',
        align: 'center',
        sortable: false,
        value: 'action',
      },
      
    ],
    valid: false,
    formData: {
      name: "",
      vp: "",
      group: "",
      event: "",
      tags: ""
    }
  }),
  methods: {
    color: (vp) => {
      return color(vp)
    },
    addSkill() {
      this.$store.dispatch("addSkill",{...this.formData})
    },
    deleteSkill(id) {
      this.$store.dispatch("deleteSkill",{id})
    },
    editSkill(payload) {
      this.showEditModal = true;
      this.skillToChangeInfo = {...payload};
      console.log(payload)
    },
    saveEditedChanges() {
      this.$store.dispatch("saveEditedSkill",{...this.skillToChangeInfo})
      this.showEditModal = false;
    },
  },
  mounted() {
    this.$store.dispatch("getSkills", "all");
  }
}
</script>
