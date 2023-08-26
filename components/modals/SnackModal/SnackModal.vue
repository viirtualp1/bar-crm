<template>
  <v-dialog v-model="currentValue" activator="parent" width="auto">
    <v-card>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="closeModal">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits({
  close: () => undefined,
})

const currentValue = ref(props.value)

watch(
  () => props.value,
  () => {
    currentValue.value = props.value
  },
)

function closeModal() {
  currentValue.value = false
}
</script>
