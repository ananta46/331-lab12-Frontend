<script setup lang="ts">
import type { Organizer } from '@/type';
import { ref } from 'vue';
import OrganizerService from '@/services/OrganizerService';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
import ImageUpload from '@/components/ImageUpload.vue';

const organizer = ref<Organizer>({
  id: 0,
  name: '',
  address: '',
  imageUrl: [],
});

let selectedFile = ref<File | null>(null);
const router = useRouter();
const store = useMessageStore();

// Handle image file selection
const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    selectedFile.value = file;
  }
};

function saveOrganizer() {
  try {
    OrganizerService.saveOrganizer(organizer.value);
    console.log(organizer.value);
    store.updateMessage('Successfully added a new organization: ' + organizer.value.name);
    setTimeout(() => {
      store.resetMessage();
      router.push({ name: 'organizer' }); 
    }, 3000);
  } catch (error) {
    console.error('Error saving organizer:', error);
    alert('Failed to create organizer');
  }
}
</script>

<template>
  <div>
    <h1>Create an Organizer</h1>
    <form @submit.prevent="saveOrganizer">
      <label>Organization Name</label>
      <input v-model="organizer.name" type="text" placeholder="Organization Name" class="field" />

      <h3>Address</h3>
      <label>Address</label>
      <input v-model="organizer.address" type="text" placeholder="Address" class="field" />

      <h3>Upload an Image</h3>
      <ImageUpload v-model="organizer.imageUrl" />>

      <button type="submit" class="button">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
}
.button {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
</style>
