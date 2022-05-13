<template>
   <v-snackbar 
    class="text-center px-5"
    v-model="show"
    :color="color"
    @input="closeSnackbar"
  >
    {{this.message}}
  </v-snackbar>   
</template>
<script lang="ts">
  import Vue from "vue";

export default  Vue.extend({
    name: "Snackbar",
    data(){
      return {
        showsnack: this.show
      }
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        message: {
            type: String,
            default: "",
        },
        color: {
            type: String,
            default: "green",
        },
    },
    methods: {
            closeSnackbar(show: boolean) {
                this.$emit('update-snackbar', show);
            }
        },
});
</script>
<style lang="scss">
  .text-center{
    text-align: center;
  }
</style>