import React, { createRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import DrawingCanvas from '../components/Canvas'
import { GameContext } from '../components/GameProvider'
import { sendDrawingSocket } from '../socket'

const Drawing = () => {
    const { gameState } = useContext(GameContext)
    const canvasRef = createRef()
    const navigate = useNavigate()

    const sendDrawing = async () => {
        const paths = await canvasRef.current.exportPaths()
        sendDrawingSocket(gameState.rival.id, { paths, guessingWord: gameState.selectedWord, nickname: gameState.nickname }, { totalTime: gameState.session.totalTime || 0, totalScore: gameState.session.totalScore || 0 })
        navigate("/waiting")
    }
  return (
    <div className='drawing'>
        <h1>
            Please draw the word
            <span style={{color: 'blue', fontWeight: '400', display: 'block', textAlign: 'center'}}>{ gameState.selectedWord }</span>
        </h1>
        <DrawingCanvas canvasRef={canvasRef} allowedDrawing />
        <button className='button' onClick={sendDrawing}>Send Drawing</button>
    </div>
  )
}

export default Drawing