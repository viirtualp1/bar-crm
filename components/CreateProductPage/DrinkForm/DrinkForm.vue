<template>
  <v-form class="drink-form" :readonly="isReadonly" @submit.prevent="submit">
    <v-col cols="12">
      <v-text-field
        v-model="currentForm.name"
        label="Название"
        variant="outlined"
        hide-details="auto"
      />
    </v-col>

    <v-col cols="12">
      <v-text-field
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
      <photo-uploader v-model:images="currentForm.images" />
    </v-col>

    <v-btn class="drink-form__submit" type="submit">Создать</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { DrinkCreateData } from '@/types/product'
import { shops } from '@/services/shops'

const props = defineProps({
  isReadonly: {
    type: Boolean,
    default: false,
  },
  form: {
    type: Object as PropType<DrinkCreateData>,
    default: null,
  },
})

const emit = defineEmits({
  submit: (_form: DrinkCreateData) => true,
})

const currentForm = ref<DrinkCreateData>(props.form)

function submit() {
  emit('submit', currentForm.value)
}
</script>

<style lang="scss" src="./DrinkForm.scss"></style>
