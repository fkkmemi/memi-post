<script setup lang="ts">
const { postCollection } = usePost()

const posts = useCollection(postCollection)
</script>
<template>
  <q-card>
    <q-toolbar>
      <q-toolbar-title>list</q-toolbar-title>
      <PostAdd :posts="posts" />
    </q-toolbar>
    <q-card-section>
      <PostItem v-for="post in posts" :key="post.id" :post="post" />
    </q-card-section>

    <q-card-actions>
      <q-btn flat label="read" @click="" />
    </q-card-actions>
  </q-card>
</template>
