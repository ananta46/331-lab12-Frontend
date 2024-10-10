<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/type'
import { ref, watchEffect, computed, watch } from 'vue'
import EventService from '@/services/EventService'
import { useRouter, useRoute } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'

const events = ref<Event[]>([])
const totalEvents = ref<number>(0)
const keyword = ref('')
const router = useRouter()
const route = useRoute()

// Set initial page from query params or default to 1
const page = ref(parseInt(route.query.page as string) || 1)

// Fetch data whenever the page or keyword changes
function updateKeyword() {
  let queryFunction;

  if (keyword.value === '') {
    queryFunction = EventService.getEvents(3, page.value)
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, 3, page.value)
  }

  queryFunction.then((response) => {
    events.value = response.data
    totalEvents.value = parseInt(response.headers['x-total-count'])
    console.log('events', events.value)
    console.log('totalEvents', totalEvents.value)
  }).catch(() => {
    router.push({ name: 'NetworkError' })
  })
}

// Watch for route changes (specifically the `page` query parameter) and update `page`
watch(() => route.query.page, (newPage) => {
  page.value = parseInt(newPage as string) || 1
  updateKeyword() // Fetch new data when the page changes
})

// Automatically trigger the data fetch when the component is loaded
watchEffect(() => {
  updateKeyword()
})

// Compute whether there is a next page
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 3) 
  return page.value < totalPages
})
</script>

<template>
  <h1>Event for good</h1>
  
  <div class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput
        v-model="keyword"
        label="Search..."
        @input="updateKeyword"
      />
    </div>

    <!-- Render event cards -->
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <!-- Pagination links -->
    <div class="flex w-[290px]">
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page - 1 } }"
        rel="prev"
        v-if="page > 1"
        class="flex-1 no-underline text-[#2c3e50] text-left"
      >
        Prev Page
      </RouterLink>

      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        class="flex-1 no-underline text-[#2c3e50] text-right"
      >
        Next Page
      </RouterLink>
    </div>
  </div>
</template>
