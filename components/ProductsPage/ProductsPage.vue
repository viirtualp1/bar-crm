<template>
  <v-container class="content">
    <v-row>
      <products-page-skeleton v-if="isLoading" />

      <template v-else>
        <template v-for="drink in showedDrinks" :key="drink.id">
          <v-col v-show="currentTab === 0 && drink.isShow" cols="12" md="4">
            <drink-card :drink="drink" />
          </v-col>
        </template>

        <template v-for="drink in draftDrinks" :key="drink.id">
          <v-col v-if="currentTab === 1 && drink" cols="12" md="4">
            <drink-card :drink="drink" />
          </v-col>
        </template>

        <template v-for="drink in nonAlcoholicDrinks" :key="drink.id">
          <v-col v-if="currentTab === 2 && drink" cols="12" md="4">
            <drink-card :drink="drink" />
          </v-col>
        </template>

        <template v-for="drink in bottleDrinks" :key="drink.id">
          <v-col v-if="currentTab === 3 && drink" cols="12" md="4">
            <drink-card :drink="drink" bottle />
          </v-col>
        </template>

        <template v-for="drink in boulesDrinks" :key="drink.id">
          <v-col v-if="currentTab === 4 && drink" cols="12" md="4">
            <drink-card :drink="drink" boules />
          </v-col>
        </template>

        <template v-for="snack in snacks" :key="snack.id">
          <v-col v-if="currentTab === 5 && snack" cols="12" md="4">
            <snack-card :snack="snack" />
          </v-col>
        </template>

        <template v-for="food in kitchenFood" :key="food.id">
          <v-col v-if="currentTab === 6 && food" cols="12" md="4">
            <snack-card :snack="food" food />
          </v-col>
        </template>

        <template v-for="discountProduct in discountProducts" :key="product.id">
          <v-col v-if="currentTab === 7 && discountProduct" cols="12" md="4">
            <snack-card :snack="discountProduct" discount />
          </v-col>
        </template>

        <template v-for="service in services" :key="service.id">
          <v-col v-if="currentTab === 8 && service" cols="12" md="4">
            <snack-card :snack="service" service />
          </v-col>
        </template>

        <create-product-form v-if="currentTab === 9" />
      </template>
    </v-row>

    <v-layout class="overflow-visible" style="height: 56px">
      <v-bottom-navigation v-model="currentTab" color="primary" horizontal>
        <v-btn v-for="(button, idx) in navigationButtons" :key="idx">
          <v-icon>{{ button.icon }}</v-icon>

          {{ button.text }}
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </v-container>
</template>

<script setup lang="ts">
import { useLazyAsyncData } from 'nuxt/app'
import { getProducts } from '@/services/product'
import type { DrinkData, SnackData } from '@/types/product'
import useFilteredDrinks from '@/composables/useFilteredDrinks'
import ProductsPageSkeleton from './ProductsPageSkeleton.vue'

interface NavigationButton {
  icon: string
  text: string
}

const products = ['drink', 'snacks', 'food', 'discount', 'services']

async function fetchData() {
  isLoading.value = true

  try {
    const [drinksData, snacksData, kitchenData, discountData, servicesData] =
      await Promise.all(
        products.map(async (product: string) => {
          const data = await getProducts(product)

          return data.docs.map((doc: any) => doc.data())
        }),
      )

    drinks.value = drinksData
    snacks.value = snacksData
    kitchenFood.value = kitchenData
    discountProducts.value = discountData
    services.value = servicesData
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

useLazyAsyncData('products', fetchData)

const isLoading = ref(false)
const currentTab = ref(0)

const drinks = ref<DrinkData[]>([])
const snacks = ref<SnackData[]>([])
const kitchenFood = ref<SnackData[]>([])
const discountProducts = ref<SnackData[]>([])
const services = ref<SnackData[]>([])

const { nonAlcoholicDrinks, draftDrinks, boulesDrinks, bottleDrinks } =
  useFilteredDrinks(drinks)

const navigationButtons = computed((): NavigationButton[] => [
  {
    icon: 'mdi-bottle-wine',
    text: 'Пиво',
  },
  {
    icon: 'mdi-glass-mug',
    text: 'Разливное',
  },
  {
    icon: 'mdi-beer',
    text: 'Безалк. напитки',
  },
  {
    icon: 'mdi-bottle-tonic',
    text: 'Бутилочное пиво',
  },
  {
    icon: 'mdi-bottle-soda-classic',
    text: 'Були',
  },
  {
    icon: 'mdi-food',
    text: 'Закуски',
  },
  {
    icon: 'mdi-fridge',
    text: 'Кухня',
  },
  {
    icon: 'mdi-sale',
    text: 'Скидки',
  },
  {
    icon: 'mdi-room-service',
    text: 'Услуги',
  },
  {
    icon: 'mdi-plus',
    text: 'Создать',
  },
])

const showedDrinks = computed(() => {
  return drinks.value.map((drink) => {
    // TODO: попытаться оптимизировать
    const includes =
      !drink.types.includes('draft') &&
      !drink.types.includes('non-alcoholic') &&
      !drink.types.includes('boules') &&
      !drink.types.includes('bottle')

    return {
      ...drink,
      isShow: includes,
    }
  })
})
</script>
