export type Ingredient = {
  name: string
  amount: string
  unit: string
  id: string
}

export const Units = [
  'N/A',
  'Cups',
  'Tbs',
  'Tsp',
  'Kg',
  'g',
  'mg',
  'L',
  'ml',
  'Lbs',
  'Oz',
]

export const UnitPluralToSingular: { [key: string]: string } = {
  Cups: 'Cup',
  Lbs: 'Lb',
}
