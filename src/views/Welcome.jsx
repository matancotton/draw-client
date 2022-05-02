import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameContext } from '../components/GameProvider'
import { setNicknameAction } from '../actions/gameAction'
import { connectSocket, resciveDrawingSocket } from '../socket'
import HighScore from '../components/HighScore'

const Welcome = () => {
    const navigate = useNavigate()
    const { gameDispatch } = useContext(GameContext)
    const [nickname, setNickname] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const updateNickname = (e) => {
        setNickname(e.target.value)
        if (e.target.value !== "") {
            setErrMsg("")
        }
    }

    const startGame = () => {
        if (nickname === "") {
            setErrMsg("Must fill in a nickname")
            return
        }
        gameDispatch(setNicknameAction(nickname))
        connectSocket(nickname, gameDispatch)
        resciveDrawingSocket(gameDispatch)
        navigate("/lobby")
    }
    return (
        <div className='welcome'>
            <div>
                <h1>Welcome To Draw & Guess Game</h1>
                <h2>Enter a Nickname and Press START to begin</h2>
            </div>
            <div className='input-container'>
                <input type="text" className="input" placeholder="Nickname" value={nickname} onChange={updateNickname} />
                <p style={{color: 'red', marginTop: 0}}>{ errMsg }</p>
                <button onClick={startGame} className='button'>START</button>
            </div>
            <HighScore />
        </div>
    )
}

export default Welcome