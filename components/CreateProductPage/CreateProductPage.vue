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

    <drink-form
      v-if="type === ProductEnum.BOULES"
      :form="formBoulesDrink"
      :is-readonly="isLoading"
      :loading="isLoading"
      @submit="addProduct"
    />

    <drink-form
      v-if="type === ProductEnum.BOTTLE"
      :form="formBottleDrink"
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

    <snack-form
      v-if="type === ProductEnum.FOOD"
      :form="formFood"
      :is-readonly="isLoading"
      :loading="isLoading"
      @submit="addProduct"
    />

    <snack-form
      v-if="type === ProductEnum.DISCOUNT"
      :form="formDiscount"
      :is-readonly="isLoading"
      :loading="isLoading"
      @submit="addProduct"
    />

    <snack-form
      v-if="type === ProductEnum.SERVICES"
      :form="formServices"
      :is-readonly="isLoading"
      :loading="isLoading"
      @submit="addProduct"
    />
  </v-container>
</template>

<script setup lang="ts">
import { uuidv4 } from '@firebase/util'

import {
  DiscountData,
  DrinkData,
  FoodData,
  ProductEnum,
  ProductType,
  ServiceData,
  SnackData,
  BottleDrink,
  BoulesDrink,
} from '@/types/product'

import { postDrink, postBottle, postBoules } from '@/services/drink'
import {
  postFood,
  postSnack,
  postDiscountProduct,
  postService,
} from '@/services/snack'
import { toast } from '@/services/toast'

import SnackForm from '@/components/CreateProductPage/SnackForm/SnackForm.vue'
import DrinkForm from '@/components/CreateProductPage/DrinkForm/DrinkForm.vue'

const isLoading = ref(false)

const formDrink = reactive<DrinkData>({
  type: ProductEnum.DRINK,
  id: uuidv4(),
  name: '',
  priceLittleSize: 0,
  priceBigSize: 0,
  locations: [],
  images: [],
  discount: 0,
  description: '',
  density: 0,
  strength: 0,
  types: [],
  inStock: true,
})

const formBoulesDrink = reactive<BoulesDrink>({
  type: ProductEnum.BOULES,
  id: uuidv4(),
  name: '',
  priceLittleSize: 0,
  priceBigSize: 0,
  locations: [],
  images: [],
  discount: 0,
  description: '',
  density: 0,
  strength: 0,
  types: [],
  inStock: true,
})

const formBottleDrink = reactive<BottleDrink>({
  type: ProductEnum.BOTTLE,
  id: uuidv4(),
  name: '',
  priceLittleSize: 0,
  priceBigSize: 0,
  locations: [],
  images: [],
  discount: 0,
  description: '',
  density: 0,
  strength: 0,
  types: [],
  inStock: true,
})

const formSnack = reactive<SnackData>({
  type: ProductEnum.SNACK,
  id: uuidv4(),
  name: '',
  price: 0,
  images: [],
  locations: [],
  discount: 0,
  description: '',
  types: [],
  inStock: true,
})

const formFood = reactive<FoodData>({
  type: ProductEnum.FOOD,
  id: uuidv4(),
  name: '',
  price: 0,
  locations: [],
  images: [],
  discount: 0,
  description: '',
  types: [],
  inStock: true,
})

const formDiscount = reactive<DiscountData>({
  type: ProductEnum.DISCOUNT,
  id: uuidv4(),
  name: '',
  price: 0,
  locations: [],
  images: [],
  discount: 0,
  description: '',
  types: [],
  inStock: true,
})

const formServices = reactive<ServiceData>({
  type: ProductEnum.SERVICES,
  id: uuidv4(),
  name: '',
  price: 0,
  locations: [],
  images: [],
  discount: 0,
  description: '',
  types: [],
  inStock: true,
})

const type = ref<ProductType>(ProductEnum.DRINK)

const types = computed(() => [
  { value: 'Drink', name: 'Напиток' },
  { value: 'Snack', name: 'Закуска' },
  { value: 'Food', name: 'Кухня' },
  { value: 'Discount', name: 'Скидки' },
  { value: 'Services', name: 'Услуги' },
  { value: 'Boules', name: 'Були' },
  { value: 'Bottle', name: 'Бутылочное пиво' },
])

async function addProduct() {
  isLoading.value = true

  try {
    switch (type.value) {
      case ProductEnum.DRINK:
        return await postDrink(formDrink)
      case ProductEnum.SNACK:
        return await postSnack(formSnack)
      case ProductEnum.FOOD:
        return await postFood(formFood)
      case ProductEnum.DISCOUNT:
        return await postDiscountProduct(formDiscount)
      case ProductEnum.SERVICES:
        return await postService(formServices)
      case ProductEnum.BOTTLE:
        return await postBottle(formBottleDrink)
      case ProductEnum.BOULES:
        return await postBoules(formBoulesDrink)
    }

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
