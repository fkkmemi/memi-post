<script setup lang="ts">
const props = defineProps<{
  posts: Post[]
}>()

const addPost = () => {
  props.posts.push({
    id: Math.random(),
    title: "post 4" + Math.random(),
    body: "body 4",
  })
}
</script>
<template>
  <q-btn flat round icon="mdi-pencil">
    <q-menu>
      <q-card>
        <q-card-actions>
          <q-btn flat label="submit" @click="addPost" />
        </q-card-actions>
      </q-card>
    </q-menu>
  </q-btn>
</template>
