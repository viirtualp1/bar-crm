export function getPriceWithDiscount(
  price: number | null | undefined,
  discount: number | null | undefined,
) {
  if (!price || !discount) {
    return 0
  }

  return price - price * (discount / 100)
}
