<template>
  <v-container class="create-product-form">
    <h1 class="create-product-form__title">Добавить продукт</h1>

    <v-select
      class="create-product-form__type"
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
import { ProductEnum, type ProductType } from '@/types/product'
import { toast } from '@/services/toast'
import { getPureFormData } from '@/utils/form'
import SnackForm from './SnackForm/SnackForm.vue'
import DrinkForm from './DrinkForm/DrinkForm.vue'
import { createProduct } from '~/services/product'

const type = ref<ProductType>(ProductEnum.DRINK)
const isLoading = ref(false)

const formDrink = reactive({
  type: ProductEnum.DRINK,
  ...getPureFormData(),
})

const formBoulesDrink = reactive({
  type: ProductEnum.BOULES,
  ...getPureFormData(),
})

const formBottleDrink = reactive({
  type: ProductEnum.BOTTLE,
  ...getPureFormData(),
})

const formSnack = reactive({
  type: ProductEnum.SNACK,
  ...getPureFormData(),
})

const formFood = reactive({
  type: ProductEnum.FOOD,
  ...getPureFormData(),
})

const formDiscount = reactive({
  type: ProductEnum.DISCOUNT,
  ...getPureFormData(),
})

const formServices = reactive({
  type: ProductEnum.SERVICES,
  ...getPureFormData(),
})

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
        return await createProduct('drink', formDrink)
      case ProductEnum.SNACK:
        return await createProduct(formSnack)
      case ProductEnum.FOOD:
        return await createProduct(formFood)
      case ProductEnum.DISCOUNT:
        return await createProduct(formDiscount)
      case ProductEnum.SERVICES:
        return await createProduct(formServices)
      case ProductEnum.BOTTLE:
        return await createProduct(formBottleDrink)
      case ProductEnum.BOULES:
        return await createProduct(formBoulesDrink)
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

<style lang="scss" src="./CreateProductForm.scss"></style>
