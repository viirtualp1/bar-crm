<template>
  <v-form
    class="drink-form"
    :readonly="isReadonly"
    :disabled="loading"
    @submit.prevent="submit"
  >
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
          v-model.number="currentForm.price.small"
          label="Цена"
          variant="outlined"
          prefix="₽"
          suffix="0.33"
          hide-details="auto"
          :hint="`Цена со скидкой: ${smallPriceWithDiscount}`"
          persistent-hint
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          type="number"
          v-model.number="currentForm.price.big"
          label="Цена"
          variant="outlined"
          prefix="₽"
          suffix="0,5"
          :hint="`Цена со скидкой: ${bigPriceWithDiscount}`"
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
          v-model="currentForm.locations"
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
        />
      </v-col>

      <v-col cols="12">
        <photo-uploader
          :id="currentForm.id"
          v-model:images="currentForm.images"
          drink
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
        <v-btn :loading="loading" color="success" type="submit" size="large">
          {{ edit ? 'Сохранить' : 'Создать' }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import type { DrinkData } from '@/types/product'
import type { FormData } from '@/types/product'
import { shops } from '@/services/shops'
import { getPriceWithDiscount } from '@/utils/price'

const props = defineProps({
  form: {
    type: Object as PropType<FormData>,
    default: null,
  },
  edit: {
    type: Boolean,
    default: false,
  },
  isReadonly: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits({
  submit: (_form: FormData) => true,
})

const currentForm = ref<FormData>(props.form)

const types = computed(() => [
  { name: 'Разливное пиво', value: 'draft' },
  { name: 'Баночное пиво', value: 'banned' },
  { name: 'Сливочное пиво', value: 'butter' },
  { name: 'Безалкогольные напитки', value: 'non-alcoholic' },
  { name: 'Фильтрованное', value: 'filtered' },
  { name: 'Светлое', value: 'light' },
  { name: 'Темное', value: 'dark' },
  { name: 'Були', value: 'boules' },
  { name: 'Бутылочное пиво', value: 'bottle' },
])

const smallPriceWithDiscount = computed(() => {
  const { price, discount } = currentForm.value

  return getPriceWithDiscount(price.small, discount?.value)
})

const bigPriceWithDiscount = computed(() => {
  const { price, discount } = currentForm.value

  return getPriceWithDiscount(price.big, discount?.value)
})

function submit() {
  emit('submit', currentForm.value)
}
</script>

<style lang="scss" src="./DrinkForm.scss"></style>
