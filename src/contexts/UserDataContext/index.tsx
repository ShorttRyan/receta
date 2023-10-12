import React, { useState } from 'react'

/* Utils */
import { ExtendedRecipe } from '../../types/extendedRecipe'

type UserDataContextType = {
  allRecipes: ExtendedRecipe[]
  setAllRecipes: (recipes: ExtendedRecipe[]) => void
  published: ExtendedRecipe[]
  drafts: ExtendedRecipe[]
  liked: ExtendedRecipe[]
  setLiked: (newArr: ExtendedRecipe[]) => void
}
type UserDataProviderProps = {
  publishedRecipes: ExtendedRecipe[]
  likedRecipes: ExtendedRecipe[]
}

export const UserDataContext = React.createContext({} as UserDataContextType)

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
