<template>
  <v-container class="create-product-page">
    <h1 class="create-product-page__title">Добавить продукт</h1>

    <v-select
      class="create-product-page__type"
      v-model="type"
      variant="outlined"
      label="Тип продукта"
      hide-details="auto"
      :items="types"
      item-title="name"
      item-value="value"
      closable-chips
    />

    <drink-form
      v-if="type === ProductEnum.DRINK"
      :form="formDrink"
      :is-readonly="isLoading"
      :loading="isLoading"
      @submit="addProduct"
    />

    <snack-form
      v-if="type === ProductEnum.SNACK"
      :form="formSnack"
      :is-readonly="isLoading"
      :loading="isLoading"
      @submit="addProduct"
    />
  </v-container>
</template>

<script setup lang="ts">
import { uuidv4 } from '@firebase/util'

import { DrinkData, ProductEnum, ProductType, SnackData } from '@/types/product'

import { postDrink } from '@/services/drink'
import { postSnack } from '@/services/snack'
import { toast } from '@/services/toast'

import SnackForm from '@/components/CreateProductPage/SnackForm/SnackForm.vue'
import DrinkForm from '@/components/CreateProductPage/DrinkForm/DrinkForm.vue'

const isLoading = ref(false)

const formDrink = reactive<DrinkData>({
  type: ProductEnum.DRINK,
  id: uuidv4(),
  name: '',
  images: [],
  priceLittleSize: 0,
  priceBigSize: 0,
  location: [],
  discount: 0,
  description: '',
  density: 0,
  strength: 0,
  isFiltered: false,
  types: [],
  inStock: true,
})

const formSnack = reactive<SnackData>({
  type: ProductEnum.SNACK,
  id: uuidv4(),
  name: '',
  images: [],
  price: 0,
  location: [],
  discount: 0,
  description: '',
  types: [],
  inStock: true,
})

const type = ref<ProductType>(ProductEnum.DRINK)

const types = computed(() => [
  { value: 'Drink', name: 'Напиток' },
  { value: 'Snack', name: 'Закуска' },
])

async function addProduct() {
  isLoading.value = true

  try {
    type.value === ProductEnum.DRINK
      ? await postDrink(formDrink)
      : await postSnack(formSnack)

    location.reload()

    toast({
      title: 'Успешно',
      icon: 'success',
    })
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" src="./CreateProductPage.scss"></style>
