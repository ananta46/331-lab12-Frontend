<script setup lang="ts">
defineProps({
    resource: {
        type: String,
        required: true,
        default: 'page'
    }
})
</script>
<template>
    <h1>Oop!</h1>
    <h3>{{ resource }}you're looking for is not here</h3>
    <RounterLink :to="{name: 'event-list'}">Back to home page</RounterLink>
</template>