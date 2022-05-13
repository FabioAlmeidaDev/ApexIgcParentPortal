<template>
  <div>
    <v-row justify="end" v-if="this.athletes.length > 0">
      <v-chip outlined small color="blue" class="mt-2 mr-5">Total: {{ this.athletes.length }}</v-chip>
    </v-row>
    <v-data-table :headers="headers" :items="athletes" :items-per-page="100" class="elevation-1" :search="search">
      <template v-slot:top>
        <v-text-field v-model="search" label="Search any field" class="mx-4"></v-text-field>
      </template>
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.athlete_number }}</td>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.clubname }}</td>
          <td class="d-none">{{ row.item.grad_year }}</td>
          <td>
            <v-btn dark x-small color="blue" @click="goto(row.item._id)" left outlined>
              <v-icon dark small>mdi-pencil</v-icon>
              Edit
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  // @ is an alias to /src
  //@ts-ignore
  import api from "@/api/server-api";
  export default {
    name: "List",
    data: () => ({
      search: "",
      athletes: [],
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
      goto(id) {
        this.$router.push(`edit/${id}`);
      },
    },
    created() {
      console.log("TEST", this.getList());
    },
  };
</script>
