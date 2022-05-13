<template>
    <div>
        <v-chip 
            v-for="chip in chips" 
            :key="chip"
            color="blue"
            label
            outlined
            small
            class="mr-1"
        >
            {{chip.trim()}} 
        </v-chip>
    </div>
</template>
<script>
export default {
    props: {
        tags: {
            type: String,
            default: ""
        }
    },
    computed: {
        chips() {
            return this.tags.split(",")
        }
    }
}
</script>
<style >

</style>