<template>
  <v-form class="drink-form" :readonly="isReadonly">
    <v-col cols="12">
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
      <v-slider
        label="Плотность"
        :ticks="density"
        v-model="form.density"
        min="5"
        max="20"
        :step="5"
        show-ticks="always"
        tick-size="3"
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
  </v-form>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { DrinkCreateData } from '@/types/product'
import { shops } from '@/services/shops'

defineProps({
  isReadonly: {
    type: Boolean,
    default: false,
  },
  form: {
    type: Object as PropType<DrinkCreateData>,
    default: null,
  },
})

const density = computed(() => [5, 10, 15, 20])
</script>

<style lang="scss" src="./DrinkForm.scss"></style>
