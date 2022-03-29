import { UnitPluralToSingular } from '../types'

export const getUnit = (unit: string, amount: string) => {
  if (unit === 'N/A') return ''
  const singularAmounts = [
    '1',
    '1/2',
    '1/3',
    '1/4',
    '1/5',
    '1/8',
    '1/10',
    '1/12',
    '1/16',
    '1/32',
  ]
  const pluralUnit = UnitPluralToSingular?.[unit]
  return singularAmounts.includes(amount) && pluralUnit !== undefined
    ? pluralUnit
    : unit
}
