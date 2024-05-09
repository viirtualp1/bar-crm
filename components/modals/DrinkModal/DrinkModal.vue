<template>
  <product-modal v-model="currentValue">
    <v-card class="drink-modal__card">
      <product-title @close="close">
        {{ drink.name }}
      </product-title>

      <v-card-text>
        <drink-modal-body v-if="currentMode === Modes.VIEW" :drink="drink" />

        <drink-form
          v-if="currentMode === Modes.EDIT"
          :form="drinkForm"
          :loading="isLoading"
          edit
          @submit:edit="submitEditProduct"
        />
      </v-card-text>

      <product-actions
        @edit:product="onEditProduct"
        @delete:product="onDeleteDrink"
        :loading="isLoading"
      />
    </v-card>
  </product-modal>
</template>

<script setup lang="ts">
import type { DrinkData } from '@/types/product'
import { deleteProduct, createProduct } from '@/services/product'

import { DrinkForm } from '@/components/CreateProductForm/DrinkForm'
import { DrinkModalBody } from './DrinkModalBody'

enum Modes {
  EDIT = 'edit',
  VIEW = 'view',
}

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
  bottle: {
    type: Boolean,
    default: false,
  },
  boules: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits({
  close: () => true,
})

const currentMode = ref<Modes>(Modes.VIEW)

const currentValue = ref(false)
const isLoading = ref(false)

watch(
  () => props.value,
  () => (currentValue.value = props.value),
)

const drinkForm = ref<DrinkData>(props.drink)

async function onDeleteDrink() {
  await deleteProduct('drink', props.drink.id)

  location.reload()
}

function onEditProduct() {
  currentMode.value = currentMode.value === Modes.EDIT ? Modes.VIEW : Modes.EDIT
}

async function submitEditProduct(form: DrinkData) {
  isLoading.value = true

  try {
    return await createProduct('drink', form)
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function close() {
  emit('close')
}
</script>

<style lang="scss" src="./DrinkModal.scss"></style>
