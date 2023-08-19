<template>
  <v-container class="create-product-page">
    <v-btn icon size="small" class="create-product-page__back">
      <nuxt-link to="/">
        <v-icon>mdi-arrow-left</v-icon>
      </nuxt-link>
    </v-btn>

    <v-form :readonly="isLoading">
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

        <template v-if="type === ProductEnum.DRINK">
          <v-col cols="12">
            <v-text-field
              v-model="formDrink.name"
              label="Название"
              variant="outlined"
              hide-details="auto"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="formDrink.description"
              label="Описание"
              variant="outlined"
              hide-details="auto"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model.number="formDrink.price"
              label="Цена"
              variant="outlined"
              prefix="₽"
              hide-details
              type="number"
            />
          </v-col>

          <v-col cols="12">
            <v-select
              v-model="formDrink.location"
              variant="outlined"
              label="Доступно в "
              hide-details="auto"
              :items="shops"
              item-title="name"
              item-value="value"
              chips
              multiple
              closable-chips
            />
          </v-col>

          <v-col cols="12">
            <v-slider
              label="Плотность"
              :ticks="density"
              v-model="formDrink.density"
              min="5"
              max="20"
              :step="5"
              show-ticks="always"
              tick-size="3"
            />
          </v-col>

          <!--          <v-col cols="12">-->
          <!--            <v-file-input-->
          <!--              v-model="formDrink.image"-->
          <!--              label="Изображение"-->
          <!--              variant="outlined"-->
          <!--              hide-details="auto"-->
          <!--              prepend-icon="mdi-camera"-->
          <!--            />-->
          <!--          </v-col>-->
        </template>
        <template v-if="type === ProductEnum.SNACK">
          <v-col cols="12">
            <v-text-field
              v-model="formSnack.name"
              label="Название"
              variant="outlined"
              hide-details="auto"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="formSnack.description"
              label="Описание"
              variant="outlined"
              hide-details="auto"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model.number="formSnack.price"
              label="Цена"
              variant="outlined"
              prefix="₽"
              hide-details
              type="number"
            />
          </v-col>

          <v-col cols="12">
            <v-select
              v-model="formSnack.location"
              variant="outlined"
              label="Доступно в "
              hide-details="auto"
              :items="shops"
              item-title="name"
              item-value="value"
              chips
              multiple
              closable-chips
            />
          </v-col>

          <!--          <v-col cols="12">-->
          <!--            <v-file-input-->
          <!--              v-model="formSnack.image"-->
          <!--              label="Изображение"-->
          <!--              variant="outlined"-->
          <!--              hide-details="auto"-->
          <!--              prepend-icon="mdi-camera"-->
          <!--            />-->
          <!--          </v-col>-->
        </template>

        <v-col cols="12">
          <v-btn color="success" @click="addProduct">Добавить</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import {
  DrinkCreateData,
  ProductEnum,
  ProductType,
  SnackCreateData,
} from '@/types/product'
import { createDrink } from '@/services/drink'
import { createSnack } from '@/services/snack'

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

const density = computed(() => [5, 10, 15, 20])

const shops = computed(() => [
  { value: 1, name: 'Первом магазине' },
  { value: 2, name: 'Втором магазине' },
  { value: 3, name: 'Третьем магазине' },
])

const type = ref<ProductType>(ProductEnum.DRINK)

const types = computed(() => [
  { value: 'Drink', name: 'Напиток' },
  { value: 'Snack', name: 'Закуска' },
])

async function addProduct() {
  isLoading.value = true

  try {
    type.value === ProductEnum.DRINK
      ? await createDrink(formDrink)
      : await createSnack(formSnack)

    alert('Успешно!')
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" src="./CreateProductPage.scss"></style>
