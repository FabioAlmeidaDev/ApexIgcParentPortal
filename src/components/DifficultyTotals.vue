<template>
<div class="difficulty-container">
    <div v-for="(index, item) in countLetters(this.skills)" :key="item">
    <v-avatar
        color="black lighten-3"
        size="20"
    >
        <span class="text--white">{{item.toUpperCase()}}</span>
    </v-avatar> 
    <span class="text--white mx-2">2</span>
    </div>
</div>
</template>
<script>
export default {
    name: "DifficultyTotals",
    props: {
        skills: {
            default: {}
        }
    },
    methods: {
        countLetters: (skills) => {
            const letters = ['a','b','c','d','e','f','g','h','i','j'];

            const obj = {};
            
            for(let i = 0; i < letters.length; i++) {
                obj[letters[i]] = 2;
            }
            console.log(letters, obj)
            return obj;
        }
    }
}
</script>
<style>
    .difficulty-container {
        display: flex;
    }
</style>