<template>
  <v-card-actions>
    <v-btn color="info" @click="editDrink"> Редактировать </v-btn>
    <v-btn color="error" @click="deleteDrink"> Удалить </v-btn>
  </v-card-actions>
</template>

<script setup lang="ts">
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
