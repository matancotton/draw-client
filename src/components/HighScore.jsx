import React, { useEffect, useState } from 'react'
import GameSession from './GameSession'

const HighScore = () => {

    const [time, setTime] = useState(0)
    const [points, setPoints] = useState(0)

    const fetchScore = async () => {
       const response = await fetch(process.env.REACT_APP_SERVER_URL+"/high-score")
       const result = await response.json()
       setTime(result.time)
       setPoints(result.points)
    }

    useEffect(() => {
        fetchScore()
    }, [])
  return (
    <div>
        <h2>Best Score Until Now:</h2>
        <GameSession timeCounter={time} score={points} />
    </div>
  )
}

export default HighScore