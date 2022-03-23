import React, { useState } from 'react'

interface HomeLogicInterface {
  addingRecipe: boolean
  setAddingRecipe: (newState: boolean) => void
}

export const HomeLogicContext = React.createContext({} as HomeLogicInterface)

export const HomeLogicProvider: React.FunctionComponent = ({ children }) => {
  const [addingRecipe, setAddingRecipe] = useState<boolean>(true)
  return (
    <HomeLogicContext.Provider value={{ addingRecipe, setAddingRecipe }}>
      {children}
    </HomeLogicContext.Provider>
  )
}
