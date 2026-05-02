export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-AU').format(value)
}
