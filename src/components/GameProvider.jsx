import React, { createContext, useReducer } from 'react'
import gameReducer, { initialState } from '../reducers/gameReducer'

export const GameContext = createContext()

const GameProvider = ({ children }) => {
    const [gameState, gameDispatch] = useReducer(gameReducer, initialState)
  return (
    <GameContext.Provider value={{ gameState, gameDispatch }}>
        { children }
    </GameContext.Provider>
  )
}

export default GameProvider