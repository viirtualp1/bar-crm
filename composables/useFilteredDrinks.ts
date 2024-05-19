import type { Ref } from 'vue'
import type { DrinkData } from '@/types/product'

export default function useFilteredDrinks(drinks: Ref<DrinkData[]>) {
  const draftDrinks = computed(() => {
    return drinks.value.filter((drink) => {
      return drink.types.includes('draft')
    })
  })

  const nonAlcoholicDrinks = computed(() => {
    return drinks.value.filter((drink) => {
      return drink.types.includes('non-alcoholic')
    })
  })

  const boulesDrinks = computed(() => {
    return drinks.value.filter((drink) => {
      return drink.types.includes('boules')
    })
  })

  const bottleDrinks = computed(() => {
    return drinks.value.filter((drink) => {
      return drink.types.includes('bottle')
    })
  })

  return {
    draftDrinks,
    nonAlcoholicDrinks,
    boulesDrinks,
    bottleDrinks,
  }
}
