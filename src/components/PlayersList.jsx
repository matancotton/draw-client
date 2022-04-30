import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setRivalAction } from '../actions/gameAction'
import { setOnlinePlayers } from '../socket'
import { GameContext } from './GameProvider'

const PlayersList = () => {
    const { gameDispatch } = useContext(GameContext)
    const [players, setPlayers] = useState([])
    const navigate = useNavigate()

    const selectRival = (rival) => {
        gameDispatch(setRivalAction(rival))
        navigate("/word-choosing")
    }

    useEffect(() => {
        setOnlinePlayers(setPlayers)
    }, [])
    return (
        <>
            {players.length > 0 ?
                <ul className='list'>
                    {
                        players.map((player) => (
                            <li key={player.id} onClick={() => selectRival(player)}>{ player.nickname }</li>
                        ))
                    }
                </ul> : (
                    <h3>No Online Players yet...</h3>
                )
            }
        </>
    )
}

export default PlayersList