<script setup lang="ts">
  import OrganizerCard from '@/components/OrganizerCard.vue'
  import type { Organizer } from '@/type'
  import { ref, onMounted, computed, watchEffect } from 'vue'
  import OrganizerService from '@/services/OrganizerService'
  const organizers = ref<Organizer[] | null>(null)
    OrganizerService.getOrganizers()
    .then((response) => {
      organizers.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })

</script>

<template>
  <h1>Events For Good</h1>
    <!-- new element-->
  <div class="flex flex-col items-center">
    <OrganizerCard v-for="organizer in organizers" :key="organizer.id" :organizer="organizer"></OrganizerCard>
  <div class="flex w-[290px]">
  </div>
</div>
</template>

<style scoped>
  
</style>