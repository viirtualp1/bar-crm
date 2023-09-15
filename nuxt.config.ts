export default defineNuxtConfig({
  ssr: false,
  css: [
    '@/assets/main.scss',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  plugins: ['@/plugins/FirebasePlugin'],
  build: {
    transpile: ['vuetify'],
  },
})
