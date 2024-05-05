<template>
  <v-form
    class="snack-form"
    :disabled="loading"
    :readonly="isReadonly"
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
          v-model.number="currentForm.price"
          label="Цена"
          variant="outlined"
          prefix="₽"
          hide-details
          type="number"
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
        <photo-uploader
          :id="currentForm.id"
          v-model:images="currentForm.images"
        />
      </v-col>

      <v-col class="snack-form__controls" cols="12">
        <v-checkbox
          v-model="currentForm.inStock"
          label="В наличии"
          hide-details="auto"
        />
      </v-col>

      <v-col cols="12">
        <v-btn color="success" type="submit" size="large">
          {{ edit ? 'Сохранить' : 'Создать' }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import type {
  DiscountData,
  FoodData,
  ServiceData,
  SnackData,
} from '@/types/product'
import { shops } from '@/services/shops'

const props = defineProps({
  form: {
    type: Object as PropType<SnackData | FoodData | DiscountData | ServiceData>,
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
  submit: (_form: SnackData | FoodData | DiscountData | ServiceData) => true,
  'submit:edit': (_form: SnackData | FoodData | DiscountData | ServiceData) =>
    true,
})

const currentForm = ref<SnackData | FoodData | DiscountData | ServiceData>(
  props.form,
)

function submit() {
  let event = 'submit'

  if (props.edit) {
    event += ':edit'
  }

  // @ts-ignore
  emit(event, currentForm.value)
}
</script>

<style lang="scss" src="./SnackForm.scss"></style>
