<script setup lang="ts">
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'

const store = useEventStore()
const { event } = storeToRefs(store)
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <RouterLink :to="{ name: 'event-detail-view', params: { id: event.id } }">Details</RouterLink>
      |
      <RouterLink :to="{ name: 'event-register-view', params: { id: event.id } }"
        >Register</RouterLink
      >
      |
      <RouterLink :to="{ name: 'event-edit-view', params: { id: event.id } }">Edit</RouterLink>
    </div>

    <RouterView :event="event"></RouterView>
  </div>
</template>