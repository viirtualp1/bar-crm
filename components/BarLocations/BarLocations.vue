<template>
  <div class="bar-locations">
    <v-chip
      class="bar-locations__location"
      tag="div"
      color="info"
      v-for="(location, idx) in locations"
      :key="idx"
    >
      {{ getLocation(Number(location)) }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import { locations } from '~/utils/drink'

defineProps({
  locations: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
})

const getLocation = (location: number) =>
  locations[location as keyof typeof locations]
</script>

<style lang="scss" src="./BarLocations.scss"></style>
