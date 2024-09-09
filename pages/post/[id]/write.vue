<script setup lang="ts">
const route = useRoute()

const id = route.params.id as string
</script>
<template>
  <q-page padding>
    <PostWrite :id="id" />
  </q-page>
</template>
