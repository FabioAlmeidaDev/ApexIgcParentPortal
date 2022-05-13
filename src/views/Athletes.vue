<template>
  <v-container>
    <h2>Athletes</h2>
    <v-text-field label="Search by athlete's name, Gym name or Grad year" v-model="searchAthletes"></v-text-field>
    <div>
      <v-row class="text-center">
        <v-col sm="12" md="4" v-for="(item, index) in filteredAthletes" :key="index">
          <v-card class="pa-5">
            <div class="athlete-number">{{ item.athlete_number }}</div>
            <div class="athlete-title">{{ item.name }}</div>
            <div class="">{{ item.clubname }}</div>
            <div class="class-of">
              class of <strong>{{ item.grad_year }}</strong>
            </div>
            <v-img :src="`https://apexcollegeshowcase-server.herokuapp.com/headshot/${item.photo}`" class="athlete-img" />
            <v-card-actions class="pa-2 pt-5 justify-center">
              <v-btn class="view-more" text color="primary" @click="() => goto(item.name, item._id)" :person="item.name"
                ><div>Read more about</div>
                <div class="athlete-name-in-button">{{ item.name }}</div></v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
  // @ is an alias to /src
  //@ts-ignore
  import api from "@/api/server-api";
  export default {
    name: "Athletes",
    data: () => ({
      search: "",
      athletes: [],
      searchAthletes: "",
      headers: [
        {
          text: "#",
          align: "start",
          value: '"athlete_number"',
        },
        {
          text: "Athlete Name",
          align: "start",
          value: "name",
        },
        {
          text: "Gym",
          align: "start",
          value: "clubname",
        },
        {
          text: "Grad",
          value: "grad_year",
          align: " d-none",
        },
        {
          text: "Action",
          align: "start",
        },
      ],
    }),
    components: {},
    computed: {
      filteredAthletes() {
        function sortByProperty(property) {
          return function(a, b) {
            if (a[property] > b[property]) return 1;
            else if (a[property] < b[property]) return -1;

            return 0;
          };
        }
        const search = this.searchAthletes.toLowerCase().trim();

        // if (!search) return this.athletes.sort(sortByProperty("clubname"));

        return this.athletes
          .filter(
            (c) =>
              c.name.toLowerCase().indexOf(search) > -1 ||
              c.clubname.toLowerCase().indexOf(search) > -1 ||
              c.grad_year
                .toString()
                .toLowerCase()
                .indexOf(search) > -1
          )
          .sort(sortByProperty("clubname"));
      },
    },
    methods: {
      async getList() {
        await api
          .get("/athletes/all", {})
          .then((response) => {
            console.log("RESPONSE: ", response);
            this.athletes = response.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      goto(name, id) {
        this.$router.push(`athletes/${name}/${id}`);
      },
    },
    created() {
      this.getList();
    },
  };
</script>

<style scoped>
  .class-of {
    color: #aaa;
    padding-left: 0.5rem;
    font-size: 0.9rem;
  }
  .athlete-img {
    border-radius: 7px;
    margin-top: 0.5rem;
  }
  .athlete-title {
    font-size: 1.4rem;
    font-weight: bold;
    margin-top: 0.5rem;
  }
  .athlete-number {
    position: absolute;
    right: 0rem;
    top: 0rem;
    color: white;
    font-weight: bold;
    background-color: #333;
    padding: 1px 6px;
    border-radius: 4px;
  }
  .athlete-name-in-button {
    color: black;
    display: block;
    font-weight: bold;
    font-size: 1.1em;
    margin-left: 0.5rem;
  }
</style>
