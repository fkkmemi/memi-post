// https://nuxt.com/docs/api/configuration/nuxt-config

import firebaseConfig from "./firebaseConfig"

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["nuxt-quasar-ui", "nuxt-vuefire"],
  quasar: {
    iconSet: "mdi-v7",
  },
  vuefire: {
    config: firebaseConfig,
    auth: {
      enabled: true,
    },
  },
})
