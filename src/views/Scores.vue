<template>
  <v-container>
  <v-card v-for="(chart, index) in report" elevation="1" class="px-5 py-5 mt-2" :key="index">
    <highcharts class="hc" :options="chart.chartOptions" ref="chart"></highcharts>
    <h1>Average per Level</h1>
    <v-data-table
      :headers="headers"
      :items="chart.averagePerLevel"
    />
  </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  // @ts-ignore
  import axios from '@/api/server-api'

  export default Vue.extend({
    name: 'Home',
    data: () => ({
      meets: [],
      report: [],
      event: '',
      chart_data: [],
      chart_labels: [],
      headers: [
          {
            text: 'Level',
            align: 'start',
            sortable: false,
            value: 'level',
          },
          { text: 'Vault', value: 'vt' },
          { text: 'Bars', value: 'ub' },
          { text: 'Beam', value: 'bb' },
          { text: 'Floor', value: 'fx' },
          { text: 'All Around', value: 'aa' },
      ],
    }),
    components: {
    },
    methods: {
      formatDate(date: any) {
          const d = new Date(date);
          let month = '' + (d.getMonth() + 1);
          let day = '' + d.getDate();
          const year = d.getFullYear();

          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;

          return [month, day, year].join('-');
      },
      averagePerLevel(scores: []) {
        const response = {};
        let levels = scores.map((item: any) => item.level);
            levels = [...new Set(levels)];

        for (let i = 0; i < levels.length; i += 1) {
          if(!response[levels[i]]){
            response[levels[i]] = {
              vt: scores.map((item: any) => {
                if(item.level == levels[i]){
                  return item.vt.score;
                }
              }).filter(item => item != undefined),
              ub: scores.map((item: any) => {
                if(item.level == levels[i]){
                  return item.ub.score;
                }
              }).filter(item => item != undefined),
              bb: scores.map((item: any) => {
                if(item.level == levels[i]){
                  return item.bb.score;
                }
              }).filter(item => item != undefined),
              fx: scores.map((item: any) => {
                if(item.level == levels[i]){
                  return item.fx.score;
                }
              }).filter(item => item != undefined),
              aa: scores.map((item: any) => {
                if(item.level == levels[i]){
                  return item.aa.score;
                }
              }).filter(item => item != undefined),
            };
          }
        }

        const merged = this.mergeLevels(response, [
          {
            levels:["C1", "CP1", "Copper1", "Copper 1"],
            outputKey: "Copper 1"
          },
          {
            levels:["C2", "CP2", "Copper2", "Copper 2"],
            outputKey: "Copper 2"
          },
          {
            levels:["B","BS", "BR", "Bronze"],
            outputKey: "Bronze"
          },
          {
            levels:["D", "DM", "Diamond"],
            outputKey: "Diamond"
          },
          {
            levels:["S", "SI", "SL", "Silver"],
            outputKey: "Silver"
          },
          {
            levels:["G", "GD", "Gold"],
            outputKey: "Gold"
          },
          {
            levels:["P", "PL", "Platinum"],
            outputKey: "Platinum"
          },
          {
            levels:["PR", "Premiere", "Premier"],
            outputKey: "Premiere"
          },
          {
            levels:["1", "LV1", "LV 1", "LVL1", "LVL 1"],
            outputKey: "Level 1"
          },
          {
            levels:["2", "LV2", "LV 2", "LVL2", "LVL 2"],
            outputKey: "Level 2"
          },
          {
            levels:["3", "LV3", "LV 3", "LVL3", "LVL 3"],
            outputKey: "Level 3"
          },
          {
            levels:["4", "LV4", "LV 4", "LVL4", "LVL 4"],
            outputKey: "Level 4"
          },
          {
            levels:["5", "LV5", "LV 5", "LVL5", "LVL 5"],
            outputKey: "Level 5"
          },
          {
            levels:["6", "LV6", "LV 6", "LVL6", "LVL 6"],
            outputKey: "Level 6"
          },
          {
            levels:["7", "LV7", "LV 7", "LVL7", "LVL 7"],
            outputKey: "Level 7"
          },
          {
            levels:["8", "LV8", "LV 8", "LVL8", "LVL 8"],
            outputKey: "Level 8"
          },
          {
            levels:["9", "LV9", "LV 9", "LVL9", "LVL 9"],
            outputKey: "Level 9"
          },
          {
            levels:["10", "LV10", "LV 10", "LVL10", "LVL 10"],
            outputKey: "Level 10"
          },                                                
        ]);
        return this.formatForDataTable(this.averageLevels(merged));

      },
      mergeLevels(data: Record<string, unknown>, mergeCriteria: [{levels: []; outputKey: string}]) {
        const output = {};
        for (let i = 0; i < mergeCriteria.length; i++) {
          const key = mergeCriteria[i].outputKey;
          const keysToMerge = mergeCriteria[i].levels;
          for( let j = 0; j < keysToMerge.length; j++) {
            if (!output[key]) {
              if (data[keysToMerge[j]]) {
                output[key] = data[keysToMerge[j]]
              }
            } else {
              const events = Object.keys(output[key]);
              for( const event of events) {
                if (data[keysToMerge[j]]) {
                  output[key][event] = output[key][event].concat(data[keysToMerge[j]][event]);
                }
              }
            }
          }
        }

        return output;
      },
      averageLevels (data: Record<string, unknown>) {
        const output = {};
        const keys = Object.keys(data);
        for( let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const events = Object.keys(data[key]);
          output[key] = {
            level: key,
          };
          for( let j=0; j < events.length; j++) {
            const event = events[j];
            output[key][event] = (data[key][event].reduce((a: number, b: number) => a + b, 0) / data[key][event].length).toFixed(3);
            
          }
        }

        return output;
      },
      formatForDataTable (data: Record<string, unknown>) {
        const output = [];
        const keys = Object.keys(data);
        for(const key of keys) {
          output.push(data[key]);
        }
        return output;
      },
      buildChart (data: any) {
        let averagePerLevel = [];
        const chartOptions= {
          chart: {
              zoomType: 'x'
          },
          title: {
            text: data.name
          },
          xAxis: {
            categories:[],
            reversed: true,
          },
          plotOptions: {
              line: {
                  dataLabels: {
                      enabled: true
                  },
                  enableMouseTracking: false
              }
          },
          series: [],
        };

        const events = ['vt','ub','bb','fx','aa'];

        for (let i = 0; i < events.length; i += 1) {
          const evt = events[i];
          // result.data.scores.reverse();
          chartOptions.series.push( {
            data: data.scores.map((item: any) => {
                const date = this.formatDate(item.date);
                chartOptions.xAxis.categories.push(`${date}<br> <b>${item.gym}</b> <br> Level ${item.level} <br> ${item.meet}`);
                return  item[evt].score;
              }),
            name: evt.toUpperCase()
          })

          averagePerLevel = this.averagePerLevel(data.scores);
        }

        return { chartOptions, averagePerLevel};
      },
      buildDataTable (data: any) {
        // implement
      },
    },
    async mounted(){
      this.report = [];
      await axios.post(`http://localhost:3001/scoreTrend/`, {
        token: this.$store.getters.getToken
      })
      .then( async(result)=>{
        const trends = result.data.data;        
        for (let i = 0; i < trends.length; i += 1) {
          this.report.push(this.buildChart(trends[i]));
        }
        console.log(this.report);

      })
    }
  })
</script>
