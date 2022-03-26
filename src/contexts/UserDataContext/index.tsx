import React, { useState } from 'react'
import { Recipe } from '@prisma/client'

interface UserDataContextInterface {
  allRecipes: Recipe[]
  setAllRecipes: (recipes: Recipe[]) => void
  published: Recipe[]
  drafts: Recipe[]
  liked: Recipe[]
  setLiked: (newArr: Recipe[]) => void
}
interface UserDataProviderProps {
  publishedRecipes: Recipe[]
  likedRecipes: Recipe[]
}

export const UserDataContext = React.createContext(
  {} as UserDataContextInterface,
)

export const UserDataProvider: React.FunctionComponent<
  UserDataProviderProps
> = ({ children, publishedRecipes, likedRecipes }) => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>(publishedRecipes)
  const drafts = allRecipes.filter((r) => r.isDraft)
  const published = allRecipes.filter((r) => !r.isDraft)
  const [liked, setLiked] = useState<Recipe[]>(likedRecipes)

  console.log(allRecipes)
  console.log(published)
  console.log(drafts)
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
