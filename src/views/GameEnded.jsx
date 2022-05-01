import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const GameEnded = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate("/lobby")
        }, 3000)
    }, [navigate])
  return (
    <div style={{ textAlign: 'center' }}>
        <h1>Game has ended</h1>
        <h2>Your opponent has disconnected</h2>
        <p>Going back to Lobby...</p>
    </div>
  )
}

export default GameEnded