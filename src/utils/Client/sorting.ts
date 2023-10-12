import { Recipe } from '@prisma/client'

export enum SortingTypes {
  newest = 'Newest First',
  oldest = 'Oldest First',
  cookTimeL2H = 'Cook Time (Low to High)',
  cookTimeH2L = 'Cook Time (High to Low)',
  nameA2Z = 'Title (A to Z)',
  nameZ2A = 'Title (Z to A)',
}

export const SortingFunctions: {
  [key in SortingTypes]: (a: Recipe, b: Recipe) => number
} = {
  [SortingTypes.newest]: (a: Recipe, b: Recipe) =>
    parseInt(b.publishedAt) - parseInt(a.publishedAt),
  [SortingTypes.oldest]: (a: Recipe, b: Recipe) =>
    parseInt(a.publishedAt) - parseInt(b.publishedAt),
  [SortingTypes.cookTimeL2H]: (a: Recipe, b: Recipe) =>
    a.timeToComplete - b.timeToComplete,
  [SortingTypes.cookTimeH2L]: (a: Recipe, b: Recipe) =>
    b.timeToComplete - a.timeToComplete,
  [SortingTypes.nameA2Z]: (a: Recipe, b: Recipe) => {
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
  },
  [SortingTypes.nameZ2A]: (a: Recipe, b: Recipe) => {
    if (a.title < b.title) return 1
    if (a.title > b.title) return -1
    return 0
  },
}
