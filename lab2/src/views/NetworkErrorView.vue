<script setup lang="ts">
import { useRouter } from 'vue-router';
const rounter = useRouter()
</script>
<template>
    <div class="network-error">
        <h1>Uh-oh!</h1>
        <h3>It look like you having internet issue! please take a breath and <a href="#" @click="rounter.go(-1)">click here</a>to try again.</h3>
        <p>Sorry, we can't get the data from the server</p>
        <p>Please try agian later.</p>
    </div>
</template>