<template>
    <div class="skill-group">
        <div :class="`skill-group-header ${this.color}--text text-darken-1  py-5 px-5 ${this.color} lighten-5 rounded`">{{this.groupTitle}}</div>
        <v-col cols="12">
            <v-row>
                <todo-list
                    title="Skills in current routine"
                    :skill-list="skillList"
                    :event="this.event"
                    :my-skills="this.inRoutine"
                    mastery="inRoutine"
                    header-color="green"
                />

                <todo-list
                    title="Skills ready to compete"
                    :skill-list="skillList"
                    :event="this.event"
                    :my-skills="this.canCompete"
                    mastery="canCompete"
                    header-color="indigo"

                />

                <todo-list
                    title="Skills I am working on"
                    :skill-list="skillList"
                    :event="this.event"
                    :my-skills="this.workingOn"
                    mastery="workingOn"
                    header-color="pink"
                />
            </v-row>
        </v-col>
    </div>
</template>

<script lang="ts">
import TodoList from "@/components/TodoList";

export default {
    name: "SkillGroup",
    components: {
        TodoList
    },
    data(){
        return {
            search: {},
            skill: {} ,
            skills: {
                vault: [
                    {
                        name:'',
                        group: '',
                        vp: '',
                        event: '',
                        tags: '',
                        type: ''
                    }

                ]
            },
            searchVault: null
        }
    },
    methods: {
        addSkillToMyProfile(mastery: string) {
            this.$store.dispatch("addUserSkill", {
                event: this.event,
                mastery, 
                skillId: this.skill[mastery]
            }).then(()=>{
                this.skill[mastery] = '';
            })
        }
    },
    props: {
        groupTitle: {
            type: String,
            default: "Required but empty",
        },
        skillList: {
            type: Array,
            default: ()=>[]
        },
        event: {
            type: String,
            default: null
        },
        color: {
            type: String,
            default: "purple"
        }
    },
    watch: {
      searchVault(val: any){
        this.skills.vault = this.skills.vault.filter(item => item.type !== "user-added")
        const found = this.skills.vault.find(element => element.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        if (!found) {
            const newItem = {
                name: val,
                group: '',
                event: 'vault',
                vp: '',
                tags: '',
                type: "user-added"
            }
            this.skills.vault.push(newItem)
        }
        }
      
    },
    computed: {
        inRoutine() {
            return this.$store.getters.userSkills[this.event].inRoutine;
        },
        canCompete() {
            return this.$store.getters.userSkills[this.event].canCompete;
        },
        workingOn() {
            return this.$store.getters.userSkills[this.event].workingOn;
        },
    },
    mounted() {
        this.$store.dispatch("getUserSkills", this.event);
    }
}
</script>

<style lang="scss">
.skill-group {

}
</style>