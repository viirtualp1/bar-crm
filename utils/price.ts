export function getPriceWithDiscount(
  price: number | undefined,
  discount: number,
) {
  if (!price) {
    return 0
  }

  return price - price * (discount / 100)
}
