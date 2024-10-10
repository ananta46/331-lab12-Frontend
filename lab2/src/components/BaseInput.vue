<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
    type: [String, Number],
    require: false,
    default: ''
    },
    label: {
        type: String, 
        default: ''
    }
})
interface BaseInputProps {
    label: string
}


function updateValue(event:Event) {
    emit('update:modelValue', (event.target as HTMLInputElement)?.value)
}
</script>
<template>
    <label v-if="label">
      {{ props.label }}
    </label>
    <input
      class="mb-6"
      :placeholder="label"
      @input="updateValue($event)"
      v-bind="$attrs"
    />
  </template>