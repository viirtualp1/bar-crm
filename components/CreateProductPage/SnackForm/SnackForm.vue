<template>
  <v-col class="snack-form" cols="12">
    <v-text-field
      v-model="form.name"
      label="Название"
      variant="outlined"
      hide-details="auto"
    />
  </v-col>

  <v-col cols="12">
    <v-text-field
      v-model="form.description"
      label="Описание"
      variant="outlined"
      hide-details="auto"
    />
  </v-col>

  <v-col cols="12">
    <v-text-field
      v-model.number="form.price"
      label="Цена"
      variant="outlined"
      prefix="₽"
      hide-details
      type="number"
    />
  </v-col>

  <v-col cols="12">
    <v-select
      v-model="form.location"
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
    <v-file-input
      v-model="form.image"
      label="Изображение"
      variant="outlined"
      hide-details="auto"
      prepend-icon="mdi-camera"
    />
  </v-col>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { SnackCreateData } from '@/types/product'
import { shops } from '@/services/shops'

defineProps({
  isReadonly: {
    type: Boolean,
    default: false,
  },
  form: {
    type: Object as PropType<SnackCreateData>,
    default: null,
  },
})
</script>

<style lang="scss" src="./SnackForm.scss"></style>
