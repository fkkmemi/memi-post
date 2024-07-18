<script setup lang="ts">
const { add } = usePost()

const title = ref("")
const body = ref("")
const postAdd = () => {
  const post: Post = {
    title: title.value,
    body: body.value,
  }
  add(post)
}
</script>
<template>
  <q-btn flat round icon="mdi-pencil">
    <q-menu>
      <q-card>
        <q-card-section>
          <q-input v-model="title" label="title" />
          <q-input v-model="body" label="body" />
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="submit" @click="postAdd" />
        </q-card-actions>
      </q-card>
    </q-menu>
  </q-btn>
</template>
