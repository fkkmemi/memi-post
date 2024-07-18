<script setup lang="ts">
const { read } = usePost()

const posts = ref<Post[]>([])
const readPost = async () => {
  // posts.value = await read()

  posts.value = [
    { id: 1, title: "post 1", body: "body 1" },
    { id: 2, title: "post 2", body: "body 2" },
    { id: 3, title: "post 3", body: "body 3" },
  ]
}
</script>
<template>
  <q-card>
    <q-toolbar>
      <q-toolbar-title>list</q-toolbar-title>
      <PostAdd :posts="posts" />
    </q-toolbar>
    <q-card-section>
      <q-list>
        <q-item v-for="post in posts" :key="post.id">
          <q-item-section>
            <q-item-label>{{ post.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-actions>
      <q-btn flat label="read" @click="readPost" />
    </q-card-actions>
  </q-card>
</template>
