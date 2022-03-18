export const getUnit = (unit: string, amount: string) => {
  const plural = ['Cup']
  console.log({ amount })
  if (plural.includes(unit) && amount !== '1') {
    return `${unit}s`
  }
  return unit
}
