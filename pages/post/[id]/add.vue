<script setup lang="ts">
const route = useRoute()

const id = route.params.id as string
</script>
<template>
  <q-page padding>
    <PostAdd :id="id" />
  </q-page>
</template>
