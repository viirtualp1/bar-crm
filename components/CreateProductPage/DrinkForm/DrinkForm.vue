<template>
  <v-form class="drink-form" :readonly="isReadonly" @submit.prevent="submit">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="currentForm.name"
          label="Название"
          variant="outlined"
          hide-details="auto"
        />
      </v-col>

      <v-col cols="12">
        <v-textarea
          v-model="currentForm.description"
          label="Описание"
          variant="outlined"
          hide-details="auto"
        />
      </v-col>

      <v-col cols="12">
        <v-text-field
          type="number"
          v-model.number="currentForm.priceLittleSize"
          label="Цена"
          variant="outlined"
          prefix="₽"
          suffix="0.33"
          hide-details="auto"
          :hint="`Цена со скидкой: ${priceLittleWithDiscount}`"
          persistent-hint
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          type="number"
          v-model.number="currentForm.priceBigSize"
          label="Цена"
          variant="outlined"
          prefix="₽"
          suffix="0,5"
          :hint="`Цена со скидкой: ${priceBigWithDiscount}`"
          persistent-hint
          hide-details="auto"
        />
      </v-col>

      <v-col cols="12">
        <v-text-field
          type="number"
          v-model.number="currentForm.discount"
          label="Скидка"
          variant="outlined"
          hide-details="auto"
          prefix="%"
        />
      </v-col>

      <v-col cols="12">
        <v-select
          v-model="currentForm.location"
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
        <v-text-field
          label="Плотность"
          type="number"
          v-model.number="currentForm.density"
          hide-details="auto"
          variant="outlined"
          prefix="%"
        />
      </v-col>

      <v-col cols="12">
        <v-text-field
          label="Крепкость"
          type="number"
          v-model.number="currentForm.strength"
          hide-details="auto"
          variant="outlined"
          prefix="%"
        />
      </v-col>

      <v-col cols="12">
        <v-select
          label="Характеристики"
          v-model="currentForm.types"
          variant="outlined"
          :items="types"
          item-title="name"
          item-value="value"
          multiple
          chips
          hide-details="auto"
        ></v-select>
      </v-col>

      <v-col cols="12">
        <photo-uploader v-model:images="currentForm.images" />
      </v-col>

      <v-col class="drink-form__controls" cols="12">
        <v-checkbox
          v-model="currentForm.isFiltered"
          label="Фильтрованное"
          hide-details="auto"
        />
      </v-col>

      <v-col class="drink-form__controls" cols="12">
        <v-checkbox
          v-model="currentForm.inStock"
          label="В наличии"
          hide-details="auto"
        />
      </v-col>

      <v-col cols="12">
        <v-btn color="success" type="submit" size="large"> Создать </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { DrinkData } from '@/types/product'
import { shops } from '@/services/shops'
import { getPriceWithDiscount } from '~/services/drink'

const props = defineProps({
  isReadonly: {
    type: Boolean,
    default: false,
  },
  form: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
})

const emit = defineEmits({
  submit: (_form: DrinkData) => true,
})

const currentForm = ref<DrinkData>(props.form)

const types = computed(() => [
  { name: 'Кухня', value: 'kitchen' },
  { name: 'Разливное пиво', value: 'draft' },
  { name: 'Баночное пиво', value: 'banned' },
  { name: 'Сливочное пиво', value: 'butter' },
])

const priceLittleWithDiscount = computed(() => {
  if (!currentForm.value.discount) {
    return 0
  }

  const { priceLittleSize, discount } = currentForm.value

  return getPriceWithDiscount(priceLittleSize, discount)
})

const priceBigWithDiscount = computed(() => {
  if (!currentForm.value.discount) {
    return 0
  }

  const { priceBigSize, discount } = currentForm.value

  return getPriceWithDiscount(priceBigSize, discount)
})

function submit() {
  emit('submit', currentForm.value)
}
</script>

<style lang="scss" src="./DrinkForm.scss"></style>
