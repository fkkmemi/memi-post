<script setup lang="ts">
const count = ref(333)

const ars = [
  1, 2, 3, 4, 6, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44, 6, 6, 6, 6, 6, 6, 4, 4,
  4, 4, 4, 4, 4, 4, 4, 44,
]
</script>

<template>
  <div>
    <a>jiji </a>
    <strong>{{ count }}</strong>
    <button @click="count++">up</button>
  </div>
</template>
