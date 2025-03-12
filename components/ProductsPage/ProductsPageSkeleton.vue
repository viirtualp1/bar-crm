<template>
  <div class="products-page-skeleton">
    <v-col v-for="i in 3" :key="i" cols="12" md="4">
      <v-skeleton-loader class="mb-8" type="card" width="100%" height="150px" />
    </v-col>
  </div>
</template>

<script lang="ts" setup>
import { VCol, VSkeletonLoader } from 'vuetify/components'
</script>
