<template>
    <v-list-item @click="route ? $router.push(`/${route}`) : null">
        <v-list-item-icon>
            <v-icon>{{this.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{this.label}}</v-list-item-title>
    </v-list-item>
</template>

<script lang="ts">

export default {
    name: "EditListItem",
    props: {
        icon: {
            type: String,
            default: ""
        },
        label: {
            type: String
        },
        route: {
            type: String,
            default: ""
        }
    }
}
</script>