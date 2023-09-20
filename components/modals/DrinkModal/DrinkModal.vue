<template>
  <product-modal v-model="currentValue">
    <v-card class="drink-modal__card">
      <product-title @close="close">
        {{ drink.name }}
      </product-title>

      <v-card-text>
        <drink-modal-body v-if="currentMode === Modes.VIEW" :drink="drink" />

        <drink-form v-if="currentMode === Modes.EDIT" :form="drinkForm" />
      </v-card-text>

      <product-actions
        @edit:product="onEditProduct"
        @delete:product="onDeleteDrink"
      />
    </v-card>
  </product-modal>
</template>

<script setup lang="ts">
import { DrinkData } from '@/types/product'
import { deleteDrink } from '@/services/drink'

import DrinkModalBody from './DrinkModalBody/DrinkModalBody.vue'
import DrinkForm from '@/components/CreateProductPage/DrinkForm/DrinkForm.vue'

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
})

const emit = defineEmits({
  close: () => undefined,
})

const currentMode = ref<Modes>(Modes.VIEW)

const currentValue = ref(false)

watch(
  () => props.value,
  () => (currentValue.value = props.value),
)

const drinkForm = ref<DrinkData>(props.drink)

async function onDeleteDrink() {
  await deleteDrink(props.drink.id)

  location.reload()
}

function onEditProduct() {
  currentMode.value = currentMode.value === Modes.EDIT ? Modes.VIEW : Modes.EDIT
}

function close() {
  emit('close')
}
</script>

<style lang="scss" src="./DrinkModal.scss"></style>
