<template>
  <div class="app">
    <products-page />

    <create-bubble />
  </div>
</template>

<script setup lang="ts">
import ProductsPage from '@/components/ProductsPage/ProductsPage.vue'
import CreateBubble from "~/components/CreateBubble/CreateBubble.vue";

useSeoMeta({
  title: 'Bar CRM'
})
</script>
