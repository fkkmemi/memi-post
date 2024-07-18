<script setup lang="ts">
const user = useCurrentUser()
</script>
<template>
  <q-page padding>
    nn{{ user }}
    <PostList />
  </q-page>
</template>
