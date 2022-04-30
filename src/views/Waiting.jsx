import React, { createRef, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CleanDrawingAction, editSessionAction, resetStateAction, setRivalAction } from '../actions/gameAction'
import Canvas from '../components/Canvas'
import { GameContext } from '../components/GameProvider'
import GameSession from '../components/GameSession'
import { disconnectSocket } from '../socket'

const Waiting = () => {
    const { gameState, gameDispatch } = useContext(GameContext)
    const [guess, setGuess] = useState("")
    const navigate = useNavigate()
    const [message, setMessage] = useState({ message: "", isError: false })
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
    const { drawing = null, socketId = "" } = useMemo(() => (gameState.incomingDrawing), [gameState.incomingDrawing])
    const canvasRef = createRef()
    const [timeCounter, setTimeCounter] = useState(gameState.session.totalTime || 0)
    let timeInterval = useRef();

    const updateGuess = (e) => {
        const guess = e.target.value.trim()
        if (guess === "")
            setMessage({ message: "", isError: false })
        setGuess(guess)
    }

    const checkGuess = () => {
        if (guess === "") {
            setMessage({ message: "Must fill in a guess for the drawing!", isError: true })
            return
        }
        const selectedWord = drawing?.guessingWord.toLowerCase()
        if (guess.toLowerCase() === selectedWord) {
            setMessage({ message: "Your answer is correct, well done !", isError: false })
            setIsCorrectAnswer(true)
            let score = 0
            switch (selectedWord.length) {
                case 3:
                case 4: score = 1
                    break;
                case 5: score = 3
                    break;
                default: score = 5
                    break;
            }
            clearInterval(timeInterval.current)
            gameDispatch(editSessionAction({ totalTime: timeCounter, totalScore: (gameState.session.totalScore || 0) + score }))
        } else {
            setMessage({ message: 'Wrong answer! try again.', isError: true })
        }
    }

    const quitGame = () => {
        gameDispatch(resetStateAction())
        disconnectSocket(gameState.session)
        navigate("/")
    }

    const newDrawing = () => {
        if (socketId !== gameState?.rival?.id) {
            gameDispatch(setRivalAction({ id: socketId, nickname: drawing.nickname }))
        }
        gameDispatch(CleanDrawingAction())
        navigate("/word-choosing")
    }

    useEffect(() => {
        timeInterval.current = setInterval(() => {
            setTimeCounter((time) => time + 1)
        }, 1000)
    }, [])

    useEffect(() => {
        setTimeCounter(gameState.session.totalTime)
    }, [gameState.session.totalTime])

    return (
        <div className='waiting-view'>
            {
                !drawing ? (
                    <h1>Waiting for drawings</h1>
                ) : (
                    <>
                        <h1>Rescived drawing from {drawing?.nickname}</h1>
                        <GameSession timeCounter={timeCounter} score={gameState.session.totalScore} />
                    </>
                )
            }
            <div className='canvas-container'>
                <Canvas canvasRef={canvasRef} paths={drawing?.paths} />
            </div>
            {
                message.message !== "" && (
                    <p className={message.isError ? 'message error' : "message"}>{message.message}</p>
                )
            }
            {
                !!drawing && !isCorrectAnswer &&
                <div className='guess-box'>
                    <div className='input-container'>
                        <label htmlFor="guess-input">Guess the drwaing:</label>
                        <input type="text" id="guess-input" className='input' placeholder='Enter your guess' value={guess} onInput={updateGuess} />
                    </div>
                    <button className='button' onClick={checkGuess}>Guess</button>
                </div>
            }
            {
                isCorrectAnswer && (
                    <div>
                        <button className='button red-button' onClick={quitGame}>Save and Quit</button>
                        <button className='button' onClick={newDrawing}>Send a new drawing</button>
                    </div>
                )
            }

        </div>
    )
}

export default Waiting