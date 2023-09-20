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
        @delete:product="onDeleteSnack"
        :loading="isLoading"
      />
    </v-card>
  </product-modal>
</template>

<script setup lang="ts">
import { SnackData } from '@/types/product'
import { deleteSnack, postSnack } from '@/services/snack'

import SnackForm from '@/components/CreateProductPage/SnackForm/SnackForm.vue'
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

async function onDeleteSnack() {
  await deleteSnack(props.snack.id)

  location.reload()
}

function onEditProduct() {
  currentMode.value = currentMode.value === Modes.EDIT ? Modes.VIEW : Modes.EDIT
}

async function submitEditProduct(form: SnackData) {
  isLoading.value = true

  try {
    await postSnack(form)
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" src="./SnackModal.scss"></style>
