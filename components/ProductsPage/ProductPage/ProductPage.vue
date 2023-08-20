<template>
  <v-container class="product-page">
    <v-btn icon size="small" class="product-page__back">
      <nuxt-link to="/">
        <v-icon>mdi-arrow-left</v-icon>
      </nuxt-link>
    </v-btn>

    <v-alert type="info" v-if="isLoading">Loading...</v-alert>

    <v-row class="mt-3">
      <v-col v-if="isDrink && drink" cols="12">
        <drink-preview :drink="drink" />
      </v-col>
      <v-col v-if="isSnack && snack" cols="12">
        <snack-preview :snack="snack" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute } from '#app'

import { getDrink } from '@/services/drink'
import { getSnack } from '@/services/snack'

import { SnackData } from '@/types/product'
import { DrinkData } from '@/types/product'

import SnackPreview from '@/components/SnackPreview/SnackPreview.vue'
import DrinkPreview from '@/components/DrinkPreview/DrinkPreview.vue'

const props = defineProps({
  isSnack: {
    type: Boolean,
    default: false,
  },
  isDrink: {
    type: Boolean,
    default: false,
  },
})

const drink = ref<DrinkData | null>(null)
const snack = ref<SnackData | null>(null)

const route = useRoute()

const isLoading = ref(false)
const id = Number(route.params.id)

async function fetchData() {
  isLoading.value = true

  try {
    if (props.isDrink) {
      drink.value = await getDrink(id)

      return
    }

    snack.value = await getSnack(id)
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => await fetchData())
</script>

<style lang="scss" src="./ProductPage.scss"></style>
