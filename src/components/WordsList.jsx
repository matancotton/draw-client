import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateSelectedWordAction } from '../actions/gameAction'
import { generateWord } from '../util'
import { GameContext } from './GameProvider'

const WordsList = () => {
    const navigate = useNavigate()
    const { gameDispatch } = useContext(GameContext)

    const selectWord = (e) => {
        const selectedWord = e.target.innerHTML
        gameDispatch(updateSelectedWordAction(selectedWord))
        navigate("/drawing")
    }

  return (
    <ul className='list'>
        <li onClick={selectWord}>{ generateWord("easy") }</li>
        <li onClick={selectWord}>{ generateWord("medium") }</li>
        <li onClick={selectWord}>{ generateWord("hard") }</li>
    </ul>
  )
}

export default WordsList