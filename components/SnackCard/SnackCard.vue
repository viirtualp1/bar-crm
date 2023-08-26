<template>
  <v-card class="mx-auto" @click="openSnackModal">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img v-if="snack.image" :cover="true" height="250" :src="snack.image" />

    <template #title>
      <v-card-title>
        {{ snack.name }}
      </v-card-title>
    </template>
    <template #append>
      <v-btn icon size="small">
        <nuxt-link :to="`/edit/${snack.id}`">
          <v-icon>mdi-pen</v-icon>
        </nuxt-link>
      </v-btn>
    </template>

    <v-card-text>
      <div class="text-subtitle-1 font-weight-bold">{{ snack.price }}</div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { SnackData } from '@/types/product'
import { useRouter } from '#app'

defineProps({
  snack: {
    type: Object as PropType<SnackData>,
    default: null,
  },
})

const emit = defineEmits({
  'open:modal': () => undefined,
})

function openSnackModal() {
  emit('open:modal')
}
</script>

<style lang="scss" src="./SnackCard.scss"></style>
