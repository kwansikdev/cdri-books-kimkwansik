export function formatPrice(n: number) {
  if (!n) return "-";
  return n.toLocaleString("ko-KR");
}
