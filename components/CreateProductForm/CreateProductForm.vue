<template>
  <v-container class="create-product-form">
    <h1 class="create-product-form__title">Добавить продукт</h1>

    <v-select
      class="create-product-form__type"
      v-model="form.type"
      variant="outlined"
      label="Тип продукта"
      hide-details="auto"
      :items="types"
      item-title="name"
      item-value="value"
      closable-chips
    />

    <drink-form
      v-if="form.type === ProductEnum.DRINK"
      :form="form"
      :is-readonly="isLoading"
      :loading="isLoading"
      @submit="addProduct"
    />

    <snack-form
      v-if="form.type === ProductEnum.SNACK"
      :form="form"
      :is-readonly="isLoading"
      :loading="isLoading"
      @submit="addProduct"
    />

    <snack-form
      v-if="form.type === ProductEnum.FOOD"
      :form="form"
      :is-readonly="isLoading"
      :loading="isLoading"
      @submit="addProduct"
    />

    <snack-form
      v-if="form.type === ProductEnum.DISCOUNT"
      :form="form"
      :is-readonly="isLoading"
      :loading="isLoading"
      @submit="addProduct"
    />

    <snack-form
      v-if="form.type === ProductEnum.SERVICES"
      :form="form"
      :is-readonly="isLoading"
      :loading="isLoading"
      @submit="addProduct"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ProductEnum } from '@/types/product'
import { toast } from '@/services/toast'
import { createProduct } from '@/services/product'
import { getPureFormData } from '@/utils/form'
import type { FormData } from '@/types/product'
import SnackForm from './SnackForm/SnackForm.vue'
import DrinkForm from './DrinkForm/DrinkForm.vue'

const isLoading = ref(false)

const form = reactive<FormData>({
  type: ProductEnum.DRINK,
  ...getPureFormData(),
})

const types = computed(() => [
  { value: 'drink', name: 'Напиток' },
  { value: 'snack', name: 'Закуска' },
  { value: 'food', name: 'Кухня' },
  { value: 'discount', name: 'Скидки' },
  { value: 'services', name: 'Услуги' },
])

async function addProduct() {
  isLoading.value = true

  try {
    await createProduct(form.type, form)

    await toast({
      title: 'Успешно',
      icon: 'success',
    })

    location.reload()
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" src="./CreateProductForm.scss"></style>
