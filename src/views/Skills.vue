<template>
  <div class="home container">
    <h1> Skills </h1>
    <skill-group group-title="Vault (VT)" :skill-list="this.$store.getters.getSkillList('vault')" event="vault"/>
    <skill-group group-title="Uneven Bars (UB)" :skill-list="this.$store.getters.getSkillList('bars')" event="bars"/>
    <skill-group group-title="Balance Beam (BB)" :skill-list="this.$store.getters.getSkillList('beam')" event="beam"/>
    <skill-group group-title="Floor Exercise (Fx)" :skill-list="this.$store.getters.getSkillList('floor')" event="floor"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SkillGroup from '@/components/SkillGroup.vue';

export default {
  name: 'Skills',
  components: {
    SkillGroup
  },
  mounted() {
    this.$store.dispatch("getSkills", "vault");
    this.$store.dispatch("getSkills", "bars");
    this.$store.dispatch("getSkills", "beam");
    this.$store.dispatch("getSkills", "floor");
  }
}
</script>
