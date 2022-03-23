import { UnitPluralToSingular } from '../types'

export const getUnit = (unit: string, amount: string) => {
  const pluralUnit = UnitPluralToSingular?.[unit]
  return amount == '1' && pluralUnit !== undefined ? pluralUnit : unit
}
