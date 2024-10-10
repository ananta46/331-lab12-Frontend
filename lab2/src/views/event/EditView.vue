<script setup lang="ts">
import type { Event } from '@/type'
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const props = defineProps<{
  event: Event
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()
const edit = () => {
  router.push({ name: 'event-detail-view', params: { id: props.event.id } })
  store.updateMessage('data has been updated ' + props.event.title)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)

}
</script>
<template>
    
        <p>Register event here</p>
        <button @click="edit">Edit</button>
    
</template>