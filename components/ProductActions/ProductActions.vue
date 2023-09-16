<template>
  <v-card-actions>
    <v-btn class="mt-3" color="error" @click="deleteDrink"> Удалить </v-btn>
  </v-card-actions>
</template>

<script setup lang="ts">
const emit = defineEmits({
  'delete:product': () => true,
})

function deleteDrink() {
  emit('delete:product')
}
</script>
