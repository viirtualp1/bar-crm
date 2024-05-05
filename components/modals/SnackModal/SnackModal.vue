<template>
  <product-modal v-model="currentValue">
    <v-card class="snack-modal__card">
      <product-title>
        {{ snack.name }}
      </product-title>

      <v-card-text>
        <snack-modal-body v-if="currentMode === Modes.VIEW" :snack="snack" />

        <snack-form
          v-if="currentMode === Modes.EDIT"
          :form="snackForm"
          :loading="isLoading"
          edit
          @submit:edit="submitEditProduct"
        />
      </v-card-text>

      <product-actions
        @edit:product="onEditProduct"
        @delete:product="onDeleteProduct"
        :loading="isLoading"
      />
    </v-card>
  </product-modal>
</template>

<script setup lang="ts">
import type { DiscountData, FoodData, SnackData } from '@/types/product'
import {
  deleteSnack,
  postFood,
  postSnack,
  postService,
  postDiscountProduct,
  deleteFood,
  deleteDiscount,
  deleteService,
} from '~/services/product'

import SnackForm from '@/components/CreateProductForm/SnackForm/SnackForm.vue'
import SnackModalBody from '@/components/modals/SnackModal/SnackModalBody/SnackModalBody.vue'

enum Modes {
  EDIT = 'edit',
  VIEW = 'view',
}

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  snack: {
    type: Object as PropType<SnackData>,
    default: null,
  },
  food: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Boolean,
    default: false,
  },
  service: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits({
  close: () => undefined,
})

const currentValue = ref(false)

const currentMode = ref<Modes>(Modes.VIEW)
const isLoading = ref(false)

const snackForm = ref<SnackData>(props.snack)

watch(
  () => props.value,
  () => {
    emit('close')
    currentValue.value = props.value
  },
)

async function onDeleteProduct() {
  if (props.food) {
    await deleteFood(props.snack.id)

    return location.reload()
  }

  if (props.discount) {
    await deleteDiscount(props.snack.id)

    return location.reload()
  }

  if (props.service) {
    await deleteService(props.snack.id)

    return location.reload()
  }

  await deleteSnack(props.snack.id)

  return location.reload()
}

function onEditProduct() {
  currentMode.value = currentMode.value === Modes.EDIT ? Modes.VIEW : Modes.EDIT
}

async function submitEditProduct(form: SnackData | FoodData | DiscountData) {
  isLoading.value = true

  try {
    if (props.food) {
      return await postFood(form)
    }

    if (props.discount) {
      return await postDiscountProduct(form)
    }

    if (props.service) {
      return await postService(form)
    }

    return await postSnack(form)
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" src="./SnackModal.scss"></style>
