<template>
  <v-form class="snack-form" :readonly="isReadonly" @submit.prevent="submit">
    <v-col class="snack-form" cols="12">
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
      <photo-uploader v-model:photos="currentForm.images" />
    </v-col>

    <v-btn class="snack-form__submit" type="submit">Создать</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { SnackCreateData } from '@/types/product'
import { shops } from '@/services/shops'

const props = defineProps({
  isReadonly: {
    type: Boolean,
    default: false,
  },
  form: {
    type: Object as PropType<SnackCreateData>,
    default: null,
  },
})

const emit = defineEmits({
  submit: (_form: SnackCreateData) => true,
})

const currentForm = ref<SnackCreateData>(props.form)

function submit() {
  emit('submit', currentForm.value)
}
</script>

<style lang="scss" src="./SnackForm.scss"></style>
