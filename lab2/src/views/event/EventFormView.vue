<script setup lang="ts">
import type { Event, Organizer } from '@/type';
import { onMounted, ref } from 'vue';
import EventService from '@/services/EventService';
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message';
import BaseInput from '@/components/BaseInput.vue';
import OrganizerService from '@/services/OrganizerService';
import BaseSelect from '@/components/BaseSelect.vue'
import ImageUpload from '@/components/ImageUpload.vue';

const event = ref<Event>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  organizer: {
    id: 0,
    name: '',
    address: '',
    imageUrl: []
  },
  participant: [],
  images: []
});

const router = useRouter();
const store = useMessageStore()

function saveEvent() {
  EventService.saveEvent(event.value)
    .then((response) => {
      router.push({ name: 'event-detail-view', params: { id: response.data.id } });
      store.updateMessage('You are successfully add a new event for ' + 
      response.data.title)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' });
    });
}

const organizers = ref<Organizer[]>([])
onMounted(() => {
  OrganizerService.getOrganizers()
  .then((response) => {
    organizers.value = response.data
  })
  .catch(() => {
    router.push({ name: 'network-error-view' })
  })
})
</script>

<template>
    <div>
      <h1>Create an Event</h1>
      <form @submit.prevent="saveEvent">
        <!-- <label>Category</label>
        <input v-model="event.category" type="text" placeholder="Category"
        class="field"/> -->
        <BaseInput v-model="event.category" type="text" label="Category" />
        
        <h3>Name & describe your event</h3>
        <!-- <label>Title</label>
        <input v-model="event.title" type="text" placeholder="Title" class="field"/> -->
        <BaseInput v-model="event.title" type="text" label="Title" />

        <BaseInput v-model="event.description" type="text" label="Description" />
  
        <h3>Where is your event?</h3>
        <BaseInput v-model="event.location" type="text" label="Location" />
  
        <h3>Who is your organizer?</h3>
        <label>Select an Organizer</label>
        <BaseSelect v-model="event.organizer.id" :options="organizers" label="Organizer" />
        <h3>The image of the Event</h3>
        <ImageUpload v-model="event.images" />>
        <button class="button" type="submit">Submit</button>
      </form>
      <pre>{{ event }}</pre>
    </div>
  </template>

<style scoped src="@/assets/Event.css"></style>