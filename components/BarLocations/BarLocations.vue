<template>
  <div class="bar-locations">
    <v-chip
      tag="div"
      color="info"
      v-for="(location, idx) in locations"
      :key="idx"
    >
      Бар {{ location }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
defineProps({
  locations: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
})
</script>
