import React, { useState } from 'react'
import { ExtendedRecipe } from '../../utils/extendedRecipe'

interface UserDataContextInterface {
  allRecipes: ExtendedRecipe[]
  setAllRecipes: (recipes: ExtendedRecipe[]) => void
  published: ExtendedRecipe[]
  drafts: ExtendedRecipe[]
  liked: ExtendedRecipe[]
  setLiked: (newArr: ExtendedRecipe[]) => void
}
interface UserDataProviderProps {
  publishedRecipes: ExtendedRecipe[]
  likedRecipes: ExtendedRecipe[]
}

export const UserDataContext = React.createContext(
  {} as UserDataContextInterface,
)

export const UserDataProvider: React.FunctionComponent<
  UserDataProviderProps
> = ({ children, publishedRecipes, likedRecipes }) => {
  const [allRecipes, setAllRecipes] =
    useState<ExtendedRecipe[]>(publishedRecipes)
  const drafts = allRecipes.filter((r) => r.isDraft)
  const published = allRecipes.filter((r) => !r.isDraft)
  const [liked, setLiked] = useState<ExtendedRecipe[]>(likedRecipes)

  return (
    <UserDataContext.Provider
      value={{
        allRecipes,
        setAllRecipes,
        liked,
        setLiked,
        published,
        drafts,
      }}
    >
      {children}
    </UserDataContext.Provider>
  )
}
