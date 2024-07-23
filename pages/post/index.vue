<script setup lang="ts">
const { generateId } = usePost()

const to = computed(() => `/post/${generateId()}/add`)
</script>
<template>
  <q-page padding>
    <q-toolbar>
      <q-space />
      <q-btn flat round icon="mdi-pencil" :to="to"> </q-btn>
    </q-toolbar>
    <PostList />
  </q-page>
</template>
