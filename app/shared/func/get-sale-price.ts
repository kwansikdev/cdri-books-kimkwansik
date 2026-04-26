export function getSalePrice(price: number, salePrice: number) {
  if (salePrice === -1) return price; // 정가로 대체
  return salePrice;
}
