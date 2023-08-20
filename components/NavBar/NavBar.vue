<template>
  <nav class="nav-bar">
    <nuxt-link to="/">
      Бар CRM <template v-if="subtitle">- {{ subtitle }}</template>
    </nuxt-link>
  </nav>
</template>

<script setup lang="ts">
defineProps({
  subtitle: {
    type: String,
    default: null,
  },
})
</script>

<style lang="scss" src="./NavBar.scss"></style>
