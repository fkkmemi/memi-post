<script setup lang="ts">
import { Timestamp } from 'firebase/firestore'
import { QForm } from 'quasar'
import type { JSONContent } from '@tiptap/core'

const props = defineProps<{
  id: string
}>()
const user = useCurrentUser()

const rule = {
  title: [(v: string) => (v && v.length > 0) || '제목을 입력해주세요'],
  category: [(v: string) => (v && v.length > 0) || '카테고리를 입력해주세요'],
  content: [(v: string) => (v && v.length > 0) || '내용을 입력해주세요'],
}

const { write, read } = usePost()
const loading = ref(false)
const title = ref('')
const content = ref<JSONContent>({
  type: 'doc',
  content: [],
})
const tags = ref<string[]>([])
const type = ref('일반')
const category = ref('')
const images = ref<PostImage[]>([])
const form = ref<QForm>()
const post = ref<PostEx | null>(null)

const contentToSummary = (content: JSONContent) => {
  // todo: content의 첫번째 text를 summary로 사용 나중에 해결
  return content.content?.at(0)?.text || ''
}

const submit = async () => {
  try {
    if (!form.value) throw Error('form이 없습니다')
    form.value.validate()
    loading.value = true
    if (!user.value) throw Error('로그인이 필요합니다')
    if (!title.value) throw Error('제목을 입력해주세요')
    if (!content.value) throw Error('내용을 입력해주세요')
    if (!category.value) throw Error('카테고리를 입력해주세요')
    const p: Post = {
      uid: user.value.uid,
      displayName: user.value.displayName || '',
      photoURL: user.value.photoURL || '',
      title: title.value,
      summary: contentToSummary(content),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      tags: tags.value,
      type: type.value,
      category: category.value,
      count: {
        view: 0,
        like: 0,
        hate: 0,
        reject: 0,
        comment: 0,
        attachment: 0,
      },
      images: images.value,
    }
    await write(props.id, p, content.value)
  } catch (e) {
    console.error(e)
    alert('알수 없는 에러')
  } finally {
    loading.value = false
  }
}

const load = async () => {
  try {
    loading.value = true
    if (!user.value) throw Error('로그인이 필요합니다')

    const rp = await read(props.id)
    if (!rp) {
      const p: Post = {
        uid: user.value.uid,
        displayName: user.value.displayName || '',
        photoURL: user.value.photoURL || '',
        title: title.value,
        summary: contentToSummary(content),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        tags: tags.value,
        type: type.value,
        category: category.value,
        count: {
          view: 0,
          like: 0,
          hate: 0,
          reject: 0,
          comment: 0,
          attachment: 0,
        },
        images: images.value,
      }
      await write(props.id, p, content.value)
      const rp2 = await read(props.id)
      post.value = rp2
    } else {
      post.value = rp
    }
  } catch (e) {
    console.error(e)
    alert('알수 없는 에러')
  } finally {
    loading.value = false
  }
}

// onMounted(() => {
//   load()
// })
// load()
watch(user, (n) => {
  if (!n) return
  load()
})

onUnmounted(() => {})
</script>
<template>
  <div v-if="!user">
    login required

    <q-circular-progress indeterminate />
  </div>
  <q-card v-else>
    <q-card-section>
      {{ post }}
    </q-card-section>
    <q-form ref="form" @submit="submit">
      <q-card-section>
        <q-input v-model="title" label="제목" :rules="rule.title" />
        <q-input v-model="category" label="카테고리" :rules="rule.category" />
      </q-card-section>
      <q-card-section>
        <TiptapEditor v-model="content" :target-id="id" :target-type="'post'" />
      </q-card-section>
      <q-card-actions>
        <q-space />
        <q-btn color="primary" label="등록" type="submit" :loading="loading" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>
