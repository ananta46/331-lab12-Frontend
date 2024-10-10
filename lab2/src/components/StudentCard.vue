<script setup lang="ts">
import type { Student } from '@/type'
defineProps<{
  student: Student
}>()
// {
//     "id": 1,
//     "studentId": "SE-001",
//     "name": "Prayuth",
//     "surname": "The minister",
//     "gpa": 3.59,
//     "image": "https://firebasestorage.googleapis.com/v0/b/publicimage-41deb.appspot.com/o/tu.jpg?alt="penAmount": 15,
//     "description": "The great man ever!!!!"
// },
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      class="p-5 w-[250px] cursor-pointer border border-[#39495c] mb-[18px] hover:scale-105 hover:shadow-lg transition-transform"
    >
      <h4>{{ student.id }} : {{ student.studentId }}</h4>
      <h2>{{ student.name + ' ' + student.surname }}</h2>
      <span>"{{ student.description }}"</span><br />
      <span>gpa : {{ student.gpa }}</span>
    </div>
  </div>
</template>