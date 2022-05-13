<template>
<v-col>
    <v-card class="elevation-1 mx-2 skill-group pb-2">
        <v-app-bar elevation="0" height="auto" dense dark :color="this.headerColor">
            <div class="full-width">
                <v-card-title class="pb-0">{{this.title}}</v-card-title>
                <div class="autocomplete-container mt-2">
                    <v-autocomplete 
                        label="Type your Skill" 
                        v-model="skill" 
                        full-width  
                        :items="skillList" 
                        item-text="name" 
                        item-value="_id" 
                        no-data-text=""
                        :search-input.sync="search"
                        hide-no-data
                        @keyup="checkForMatches"
                        outlined
                        dense
                        >
                            <template v-slot:item="data">
                            <template v-if="typeof data.item !== 'object'">
                            </template>
                            <template v-else>
                                <v-avatar size="30" :color="color(data.item.vp)" class="mr-3" small>
                                    <span class="white--text small">{{data.item.vp}}</span>
                                </v-avatar>
                                <v-list-item-content>
                                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                                <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                            </template>
                    </v-autocomplete>
                    <v-btn
                        outlined
                        @click="addSkillToMyProfile('inRoutine')"
                        class="ml-2"
                    >
                        Add
                    </v-btn>
                </div>
                <div>
                    <difficulty-totals :skills="this.mySkills"/>
                </div>
            </div>
        </v-app-bar>
        <v-alert type="info" text dense v-if="this.showNotInTheList"> This skill is not <b>yet</b> in our databases, but dont worry! Go ahead and click the ADD button and we'll take care of the rest </v-alert>
        <div class="skill-list">
            <div class="skill-item" v-for="(skill, index) in this.mySkills" :key="index"> 
                <v-avatar size="30" :color="color(skill.vp)" class="mr-3" small>
                    <span class="white--text small">{{skill.vp}}</span>
                </v-avatar>
                <div class="skill-name"> {{skill.name}}</div>
                <v-icon small color="red" @click="()=>deleteSkillFromMyProfile(skill._id)"> mdi-delete </v-icon>
            </div>
        </div>
        <v-card-text v-if="this.mySkills.length == 0">
            <v-alert 
                dense
                outlined
                type="info"
            > 
                You dont have any skills added to this list.
            </v-alert>
        </v-card-text>
    </v-card>
</v-col>
</template>

<script lang="ts">
import {color} from "@/lib/colors";
import DifficultyTotals from './DifficultyTotals.vue';
export default {
    name: "TodoList",
    data(){
        return {
            search: '',
            skill: '' ,
            showNotInTheList: false
        }
    },
    components: {
        DifficultyTotals
    },
    methods: {
        addSkillToMyProfile() {
            this.$store.dispatch("addUserSkill", {
                event: this.event,
                mastery: this.mastery, 
                skillId: this.skill,
                skillName: this.search
            }).then(()=>{
                this.skill = '';
                this.showNotInTheList = false;
            })
        },
        deleteSkillFromMyProfile(skillId: string) {
            this.$store.dispatch("deleteUserSkill", {
                event: this.event,
                mastery: this.mastery, 
                skillId,
            })
        },
        checkForMatches() {
            const found = this.skillList.find(element => element.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1);

            if (!found) {
                this.showNotInTheList = true;
            }else{
                this.showNotInTheList = false;
            }
        },
        color: (vp) => {
            return color(vp)
        },
    },
    props: {
        headerColor: {
            type: String,
            default: "grey"
        },
        title: {
            type: String,
            default: "Required but empty",
        },
        skillList: {
            type: Array,
            default: ()=>[]
        },
        mySkills: {
            type: Array,
            default: ()=>[]
        },
        event: {
            type: String,
            default: null
        },
        mastery: {
            type: String,
            default: ''
        },
        showDifficultyTotals: {
            type: Boolean,
            default: true
        }
    },
    computed: {
    }
}
</script>

<style lang="scss">
.skill-group {
    .full-width {
        width: 100%;
    }
    .flex-direction-column {
        flex-direction: column;
    }
    .skill-list {
        padding:1rem;
    }
    .autocomplete-container {
        display: flex;
        align-items: baseline;
    }
    .skill-group-header {
        font-weight: bold;
        font-size: 1.2rem;
        margin-top: 2rem;
    }
    .skill-col {
        border-left: 1px dotted #666;
    }
    .skill-col-header{
        font-weight: bold;
    }
    .skill-item {
        padding: 0.5rem;
        border: 1px solid #AAA;
        border-radius: 0.25rem;
        margin: 0.5rem;
        display: flex;

        .skill-name {
            flex-grow: 1;
        }

        .skill-difficulty-value {
            padding: 0 0.375rem;
            border-right: 0.125rem solid #666;
            margin-right: 0.375rem;
        }
    }
}
</style>