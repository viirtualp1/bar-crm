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
      <photo-uploader v-model:images="currentForm.images" />
    </v-col>

    <v-col cols="12">
      <v-btn color="success" type="submit" size="large"> Создать </v-btn>
    </v-col>
  </v-form>
</template>

<script setup lang="ts">
import { SnackData } from '@/types/product'
import { shops } from '@/services/shops'

const props = defineProps({
  isReadonly: {
    type: Boolean,
    default: false,
  },
  form: {
    type: Object as PropType<SnackData>,
    default: null,
  },
})

const emit = defineEmits({
  submit: (_form: SnackData) => true,
})

const currentForm = ref<SnackData>(props.form)

function submit() {
  emit('submit', currentForm.value)
}
</script>

<style lang="scss" src="./SnackForm.scss"></style>
