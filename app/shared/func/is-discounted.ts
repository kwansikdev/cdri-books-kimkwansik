export function isDiscounted(price: number, salePrice: number) {
  return salePrice !== -1 && salePrice < price;
}
