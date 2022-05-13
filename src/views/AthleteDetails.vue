<template>
  <v-container class="view-athlete">
    <v-row>
      <v-chip class="ml-5" outlined color="blue" @click="() => this.$router.go('-1')">
        <v-icon left>mdi-arrow-left</v-icon>
        Back
      </v-chip>
    </v-row>
    <v-row class="section">
      <v-col sm="12">
        <h3 class="section-header">
          <span class="athlete-number">{{ athlete_number }}</span
          >{{ name }}
        </h3>
        <h4>{{ clubname }}</h4>
      </v-col>
      <v-col md="6" sm="12">
        <div class="view-athlete-image-preview-container">
          <v-img :src="url" class="view-athlete-image-preview"></v-img>
        </div>
      </v-col>
      <v-col md="6" sm="12">
        <div class="view-athlete-label">Email</div>
        <div class="view-athlete-value">{{ email }}</div>

        <div class="view-athlete-label">Graduating year</div>
        <div class="view-athlete-value">{{ grad_year }}</div>

        <div class="view-athlete-label">Current GPA</div>
        <div class="view-athlete-value">{{ gpa }}</div>

        <div class="view-athlete-label">Youtube Channel URL</div>
        <div class="view-athlete-value">
          <a :href="youtube" target="_blank">{{ youtube }}</a>
        </div>

        <div class="view-athlete-label">Instagram URL</div>
        <div class="view-athlete-value">
          <a :href="instagram" target="_blank">{{ instagram }}</a>
        </div>
      </v-col>
    </v-row>

    <v-row class="section">
      <v-col cols="12" class="mb-4 main-container">
        <h3 class="section-header">Skills</h3>
        <h4 class="section-sub-header">
          Below you will find the skills this gymnast is currently competing and the skills she is working on
        </h4>
        <br />
        <div class="view-athlete-label">Vault (VT) - Currently Competing</div>
        <div class="view-athlete-value skills">{{ vt_current }}</div>
        <div class="view-athlete-label">Vault (VT) - Working on</div>
        <div class="view-athlete-value skills">{{ vt_working }}</div>
        <br />
        <div class="view-athlete-label">Uneven Bars (UB) - Currently Competing</div>
        <div class="view-athlete-value skills">{{ ub_current }}</div>
        <div class="view-athlete-label">Uneven Bars (UB) - Working on</div>
        <div class="view-athlete-value skills">{{ ub_working }}</div>
        <br />
        <div class="view-athlete-label">Balance Beam (BB) - Currently Competing</div>
        <div class="view-athlete-value skills">{{ bb_current }}</div>
        <div class="view-athlete-label">Balance Beam (BB) - Working on</div>
        <div class="view-athlete-value skills">{{ bb_working }}</div>
        <br />
        <div class="view-athlete-label">Floor Exercise (Fx) - Currently Competing</div>
        <div class="view-athlete-value skills">{{ fx_current }}</div>
        <div class="view-athlete-label">Floor Exercise (Fx) - Working on</div>
        <div class="view-athlete-value skills">{{ fx_working }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  //@ts-ignore
  import api from "@/api/server-api";

  export default Vue.extend({
    name: "Register",

    data: () => ({
      id: 0,
      url: "/fem-placeholder.png",
      base64: "",
      photo: null,
      valid: true,
      athlete_number: "",
      name: "",
      clubname: "",
      gpa: "",
      email: "",
      grad_year: "",
      youtube: "",
      instagram: "",
      vt_current: "",
      vt_working: "",
      ub_current: "",
      ub_working: "",
      bb_current: "",
      bb_working: "",
      fx_current: "",
      fx_working: "",
    }),
    methods: {},
    computed: {
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
    async mounted() {
      const { id } = this.$route.params;
      const response = await api.post("/athletes/find", { id }).then((res: any) => {
        this.id = res.data._id;
        this.url = "https://apexcollegeshowcase-server.herokuapp.com/get_file/" + res.data.photo;
        this.athlete_number = res.data.athlete_number;
        this.name = res.data.name;
        this.clubname = res.data.clubname;
        this.email = res.data.email;
        this.gpa = res.data.gpa.toFixed(1);
        this.grad_year = res.data.grad_year;
        this.youtube = res.data.youtube;
        this.instagram = res.data.instagram;
        this.vt_current = res.data.vt_current;
        this.vt_working = res.data.vt_working;
        this.ub_current = res.data.ub_current;
        this.ub_working = res.data.ub_working;
        this.bb_current = res.data.bb_current;
        this.bb_working = res.data.bb_working;
        this.fx_current = res.data.fx_current;
        this.fx_working = res.data.fx_working;
      });
    },
  });
</script>

<style lang="scss">
  .view-athlete {
    .section {
      margin-top: 2rem;
    }
    span.athlete-number {
      background-color: #222;
      color: #fff;
      padding: 2px 9px;
      font-size: 0.9rem;
      margin-right: 1rem;
      border-radius: 4px;
    }
    .view-athlete-label {
      font-size: 1rem;
      font-weight: bold;
    }

    .view-athlete-value {
      margin-bottom: 1rem;
      border-bottom: 1px solid #eee;
      padding: 0.5rem 0;
    }
    .main-container {
      padding: 2rem !important;
    }
    .view-athlete-image-preview-container {
      border: 1px solid #ccc;
      padding: 1rem;
    }
    .view-athlete-value.skills {
      margin-bottom: 2rem;
    }
  }
</style>
