<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from './stores/message'
import { storeToRefs } from 'pinia'

import { injectSpeedInsights } from '@vercel/speed-insights';

injectSpeedInsights();
const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav class="py-6">
          <router-link class="font-bold text-gray-700" :to="{ name: 'event-list-view' }" exact-active-class="text-green-500">Event</router-link> |
          <router-link class="font-bold text-gray-700" :to="{ name: 'about' }" exact-active-class="text-green-500">About</router-link> |
          <router-link class="font-bold text-gray-700" :to="{ name: 'add-event' }" exact-active-class="text-green-500">New Event</router-link> |
          <router-link class="font-bold text-gray-700" :to="{ name: 'organizer' }" exact-active-class="text-green-500">Organizer</router-link> |
          <router-link class="font-bold text-gray-700" :to="{ name: 'add-organier' }" exact-active-class="text-green-500">New Organizer</router-link>

          | <RouterLink class="font-bold text-gray-700"
        exact-active-class="text-green-500" :to="{ name: 'student' }">Student</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style>
h2 {
  font-size: 20px;
}
/* lab 4. 1.5 */

</style>