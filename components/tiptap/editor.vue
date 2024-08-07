<template>
  <div>
    <!-- <div v-if="editor">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        italic
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        strike
      </button>
      <button
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
      >
        code
      </button>
      <button @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </button>
      <button
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        paragraph
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        h1
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        h2
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        h3
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        h4
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        h5
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        h6
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        bullet list
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        ordered list
      </button>
      <button
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        code block
      </button>
      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }"
      >
        blockquote
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button>
      <button
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        undo
      </button>
      <button
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
      >
        redo
      </button>
    </div> -->

    <div v-if="editor">
      <q-btn-group flat>
        <q-btn
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :color="editor.isActive('bold') ? 'primary' : undefined"
          flat
          outline
          dense
          icon="mdi-format-bold"
          class=""
        >
        </q-btn>
        <q-btn
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :color="editor.isActive('italic') ? 'primary' : undefined"
          flat
          outline
          dense
          icon="mdi-format-italic"
        />
        <q-btn
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :color="editor.isActive('strike') ? 'primary' : undefined"
          flat
          outline
          dense
          icon="mdi-format-strikethrough-variant"
        />
        <q-btn
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
          :color="editor.isActive('code') ? 'primary' : undefined"
          flat
          outline
          dense
          icon="mdi-code-tags"
          class="gt-xs"
        />
        <q-btn
          @click="editor.chain().focus().unsetAllMarks().run()"
          flat
          outline
          dense
          icon="mdi-format-clear"
          class="gt-xs"
        />
        <!-- <q-btn
          @click="editor.chain().focus().clearNodes().run()"
          flat
          outline
          dense
          icon="mdi-format-paint"
        /> -->
        <q-btn
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
          :color="editor.isActive('paragraph') ? 'primary' : undefined"
          flat
          outline
          dense
          icon="mdi-format-paragraph"
          class="gt-sm"
        />

        <q-btn
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          :color="editor.isActive('bulletList') ? 'primary' : undefined"
          flat
          outline
          dense
          icon="mdi-format-list-bulleted"
          class="gt-sm"
        />
        <q-btn
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
          :color="editor.isActive('orderedList') ? 'primary' : undefined"
          flat
          outline
          dense
          icon="mdi-format-list-numbered"
          class="gt-sm"
        />
        <q-btn
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
          :color="editor.isActive('codeBlock') ? 'primary' : undefined"
          flat
          outline
          dense
          icon="mdi-code-braces"
          class="gt-sm"
        />
        <q-btn
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
          :color="editor.isActive('blockquote') ? 'primary' : undefined"
          flat
          outline
          dense
          icon="mdi-format-quote-open"
          class="gt-sm"
        />
        <q-btn
          @click="editor.chain().focus().setHorizontalRule().run()"
          flat
          outline
          dense
          icon="mdi-minus"
          class="gt-md"
        />
        <q-btn
          @click="editor.chain().focus().setHardBreak().run()"
          flat
          outline
          dense
          icon="mdi-format-line-spacing"
          class="gt-md"
        />
        <q-btn
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
          flat
          outline
          dense
          icon="mdi-undo"
          class="gt-md"
        />
        <q-btn
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
          flat
          outline
          dense
          icon="mdi-redo"
          class="gt-md"
        />
        <q-btn flat outline dense icon="mdi-image">
          <q-menu @before-show="initImage">
            <q-card>
              <q-card-section>
                <q-file v-model="file" label="파일" />
                <q-input v-model="description" label="설명" />
              </q-card-section>
              <q-card-section>
                <q-img :src="viewImage" />
              </q-card-section>
              <q-card-actions>
                <q-space />
                <q-btn
                  @click="imageSave"
                  label="저장"
                  icon="mdi-content-save"
                  color="primary"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-menu>
        </q-btn>
      </q-btn-group>
    </div>
    <div>{{ attachments }}</div>
    <q-separator />
    <div>
      {{ modelValue }}
    </div>
    <TiptapEditorContent :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import type { JSONContent } from '@tiptap/core'
import Image from '@tiptap/extension-image'
import { useQuasar } from 'quasar'

const props = defineProps<{
  modelValue: JSONContent
  targetId: string
  targetType: string
}>()

const emit = defineEmits<{
  'update:modelValue': [JSONContent]
}>()

const { setAttachment, queryAttachmentsByTargetId, deleteAttachment } =
  useAttachment()

const { loading } = useQuasar()

const viewImage = computed(() => {
  if (!file.value) return ''
  return URL.createObjectURL(file.value)
})

const editor = useEditor({
  content: props.modelValue,
  extensions: [TiptapStarterKit, Image],
  onUpdate: (content) => {
    // console.log(content.editor.getJSON())
    // console.log(content.editor.getHTML())
    const json = content.editor.getJSON()
    if (!json) return

    findAndRemoveAttachment(json)
    emit('update:modelValue', json)
  },
  editorProps: {
    // attributes: {
    //   class: 'prose max-w-none',
    // },
    handlePaste: (view, event) => {
      const d = event.clipboardData
      if (!d) return false
      for (const f of d.files) {
        save(f)
      }
      return true
    },
    handleDrop: (view, event) => {
      const d = event.dataTransfer
      if (!d) return false
      for (const f of d.files) {
        save(f)
      }
      return true
    },
  },
})

onBeforeUnmount(() => {
  if (!editor.value) return
  editor.value.destroy()
})

const file = ref<File | null>(null)
const description = ref('')

const save = async (f: File) => {
  try {
    loading.show({
      message: '이미지를 업로드 중입니다',
    })
    // if (!file.value) throw Error('파일을 선택해주세요')
    if (!f) throw Error('파일을 선택해주세요')
    if (!editor.value) throw Error('에디터를 초기화 중입니다')

    const { src, alt } = await setAttachment(
      props.targetId,
      props.targetType,
      description.value,
      '',
      f,
    )
    const title = `${attachments.value.length}. ${f.name}`
    editor.value.chain().focus().setImage({ src, alt, title }).run()
  } finally {
    loading.hide()
  }
}

const imageSave = async () => {
  if (!file.value) return
  await save(file.value)
}
const initImage = () => {
  file.value = null
  description.value = ''
}

const attachments = useCollection(() =>
  queryAttachmentsByTargetId(props.targetId),
)

const findAndRemoveAttachment = (content: JSONContent) => {
  const cs = findImagesFromContent(content)
  const as = attachments.value
  if (!as) return

  for (const a of as) {
    if (cs.map((c) => c?.alt).includes(a.id)) continue
    deleteAttachment(a.id)
  }
}
</script>
