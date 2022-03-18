export interface Ingredient {
  name: string
  amount: number
  unit: Unit
}

export enum Unit {
  Tbs = 'Tbs',
  Tsp = 'Tsp',
  Cups = 'Cups',
  Mg = 'mg',
  G = 'g',
  Kg = 'Kg',
  ml = 'ml',
  L = 'L',
  Oz = 'Oz',
}
