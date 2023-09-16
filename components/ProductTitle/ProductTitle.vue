<template>
  <v-card-title class="product-title">
    <slot />

    <v-spacer />

    <close-button @close="close" />
  </v-card-title>
</template>

<script setup lang="ts">
import CloseButton from '@/components/CloseButton/CloseButton.vue'

const emit = defineEmits({
  close: () => true,
})

function close() {
  emit('close')
}
</script>

<style lang="scss" src="./ProductTitle.scss"></style>
