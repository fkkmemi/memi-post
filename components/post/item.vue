<script setup lang="ts">
const props = defineProps<{
  post: PostEx
}>()
const { remove, update } = usePost()

const removePost = () => {
  if (!confirm("Are you sure?")) return
  remove(props.post.id)
}

const title = ref(props.post.title)
const body = ref(props.post.body)

const updateTitle = () => {
  update(props.post.id, { title: title.value })
}
const updateBody = () => {
  update(props.post.id, { body: body.value })
}

const updatePost = () => {
  update(props.post.id, { title: title.value, body: body.value })
}
</script>

<template>
  <q-item>
    <q-item-section>
      <!-- {{ post.id }} -->
      <q-item-label lines="1">
        {{ post.title }}
        <q-btn flat icon="mdi-pencil">
          <q-menu>
            <q-card>
              <q-input v-model="title"></q-input>
              <q-card-actions>
                <q-btn flat label="submit" @click="updateTitle" />
              </q-card-actions>
            </q-card>
          </q-menu>
        </q-btn>
      </q-item-label>
      <q-item-label caption>
        {{ post.body }}
        <q-btn flat icon="mdi-pencil">
          <q-menu>
            <q-card>
              <q-input v-model="body"></q-input>
              <q-card-actions>
                <q-btn flat label="submit" @click="updateBody" />
              </q-card-actions>
            </q-card>
          </q-menu>
        </q-btn>
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn flat icon="mdi-pencil">
        <q-menu>
          <q-card>
            <q-input v-model="title"></q-input>
            <q-input v-model="body"></q-input>
            <q-card-actions>
              <q-btn flat label="submit" @click="updatePost" />
            </q-card-actions>
          </q-card>
        </q-menu>
      </q-btn>
      <q-btn flat icon="mdi-delete" @click="removePost" />
    </q-item-section>
  </q-item>
</template>
