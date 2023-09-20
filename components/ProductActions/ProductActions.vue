<template>
  <v-card-actions>
    <v-btn color="info" :loading="loading" @click="editDrink">
      Редактировать
    </v-btn>
    <v-btn color="error" :loading="loading" @click="deleteDrink">
      Удалить
    </v-btn>
  </v-card-actions>
</template>

<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits({
  'delete:product': () => true,
  'edit:product': () => true,
})

function deleteDrink() {
  emit('delete:product')
}

function editDrink() {
  emit('edit:product')
}
</script>
