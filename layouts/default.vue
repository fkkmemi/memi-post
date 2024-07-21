<script setup lang="ts">
const drawer = ref(false)
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="mdi-menu" @click="drawer = !drawer" />

        <q-toolbar-title> memi-post </q-toolbar-title>
        <AuthBtn />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="drawer" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white"> </q-footer>
  </q-layout>
</template>
