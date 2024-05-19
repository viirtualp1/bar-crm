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
          @submit="submitEditProduct"
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
import type { ProductType, SnackData, FormData } from '@/types/product'
import { deleteProduct, createProduct } from '@/services/product'
import { SnackForm } from '@/components/CreateProductForm/SnackForm'
import { SnackModalBody } from './SnackModalBody'

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
    type: Object as PropType<FormData>,
    default: null,
  },
  type: {
    type: String as PropType<ProductType>,
    default: 'snack',
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
  await deleteProduct(props.type, snackForm.value.id)

  return location.reload()
}

function onEditProduct() {
  currentMode.value = currentMode.value === Modes.EDIT ? Modes.VIEW : Modes.EDIT
}

async function submitEditProduct(form: FormData) {
  isLoading.value = true

  try {
    return await createProduct(props.type, form)
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" src="./SnackModal.scss"></style>
