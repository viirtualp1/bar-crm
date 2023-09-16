<template>
  <product-modal v-model="currentValue">
    <v-card class="drink-modal__card">
      <product-title @close="close">
        {{ drink.name }}
      </product-title>

      <v-card-text>
        <div class="drink-modal__discount" v-if="drink.discount">
          <div class="drink-modal__discount-with drink-card__price">
            {{ priceWithDiscount }}
          </div>

          <div class="drink-modal__discount-without">{{ drink.price }} ₽</div>
        </div>

        <div v-else class="drink-modal__price">{{ drink.price }} ₽</div>

        <div class="mb-4">{{ drink.description }}</div>

        <div class="drink-modal__chips mt-2">
          <v-chip class="drink-card__chip mr-2" color="error">
            Крепкость {{ drink.strength }}
          </v-chip>
          <v-chip class="drink-card__chip" color="success">
            Плотность {{ drink.density }}
          </v-chip>
        </div>

        <bar-locations :locations="drink.location" />

        <images-slider v-if="drink.images.length > 0" :photos="drink.images" />
      </v-card-text>

      <product-actions @delete:product="onDeleteDrink" />
    </v-card>
  </product-modal>
</template>

<script setup lang="ts">
import { DrinkData } from '@/types/product'
import { deleteDrink } from '@/services/drink'

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
})

const emit = defineEmits({
  close: () => undefined,
})

const currentValue = ref(false)

const nuxt = useNuxtApp()

watch(
  () => props.value,
  () => (currentValue.value = props.value),
)

const priceWithDiscount = computed(() => {
  if (!props.drink.discount) {
    return 0
  }

  return props.drink.price - props.drink.price * (props.drink.discount / 100)
})

async function onDeleteDrink() {
  await deleteDrink(props.drink.id)

  location.reload()
}

function close() {
  emit('close')
}
</script>

<style lang="scss" src="./DrinkModal.scss"></style>
