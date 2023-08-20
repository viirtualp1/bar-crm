<template>
  <v-container class="create-product-page">
    <v-btn icon size="small" class="create-product-page__back">
      <nuxt-link to="/">
        <v-icon>mdi-arrow-left</v-icon>
      </nuxt-link>
    </v-btn>

    <v-row class="create-product-page__row">
      <h1 class="create-product-page__title">Добавить продукт</h1>

      <v-col cols="12">
        <v-select
          v-model="type"
          variant="outlined"
          label="Тип продукта"
          hide-details="auto"
          :items="types"
          item-title="name"
          item-value="value"
          closable-chips
        />
      </v-col>

      <drink-form
        v-if="type === ProductEnum.DRINK"
        :form="formDrink"
        :is-readonly="isLoading"
      />

      <snack-form
        v-if="type === ProductEnum.SNACK"
        :form="formSnack"
        :is-readonly="isLoading"
      />

      <v-col cols="12">
        <v-btn color="success" :loading="isLoading" @click="addProduct">
          Добавить
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios'
import { useRouter } from '#app'

import {
  DrinkCreateData,
  ProductEnum,
  ProductType,
  SnackCreateData,
} from '@/types/product'

import { createDrink } from '@/services/drink'
import { createSnack } from '@/services/snack'
import { toast } from '@/services/toast'

import DrinkForm from '@/components/CreateProductPage/DrinkForm/DrinkForm.vue'
import SnackForm from '@/components/CreateProductPage/SnackForm/SnackForm.vue'

const router = useRouter()

const isLoading = ref(false)

const formDrink = reactive<DrinkCreateData>({
  name: '',
  image: '',
  price: 0,
  location: [],
  discount: 0,
  description: '',
  density: 0,
  strength: 0,
})

const formSnack = reactive<SnackCreateData>({
  name: '',
  image: '',
  price: 0,
  location: [],
  discount: 0,
  description: '',
})

const type = ref<ProductType>(ProductEnum.DRINK)

const types = computed(() => [
  { value: 'Drink', name: 'Напиток' },
  { value: 'Snack', name: 'Закуска' },
])

async function addProduct() {
  isLoading.value = true

  try {
    const data =
      type.value === ProductEnum.DRINK
        ? await createDrink(formDrink)
        : await createSnack(formSnack)

    console.log(data)

    const result = await toast({
      title: 'Успешно',
      icon: 'success',
      confirmButtonText: 'Перейти к продукту',
    })

    if (result.isConfirmed) {
      router.push(`${type.value}/4`)
    }
  } catch (err) {
    console.error(err)

    toast({
      title: 'Ошибка при создании',
      text: (err as AxiosError).message,
      icon: 'error',
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" src="./CreateProductPage.scss"></style>
