import React, { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { GameContext } from './GameProvider'

const Inbox = ({ setIsInboxVisible }) => {
    const { gameState } = useContext(GameContext)
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onCloseClicked = () => {
        setIsInboxVisible(false)
    }


    const enterDrawing = () => {
        setIsInboxVisible(false)
        navigate("/waiting")
    }
    return (
        <>
            {
                pathname === "/waiting" ||  !gameState?.incomingDrawing?.drawing? <></> :
                    <div className="inbox-container">
                        <span className="close-inbox" onClick={onCloseClicked}>X</span>
                        <h3 className="title">Rescived a drawing from {gameState?.incomingDrawing?.drawing?.nickname}</h3>
                        <button className='button' onClick={enterDrawing}>View the drawing</button>
                    </div>
            }

        </>
    )
}

export default Inbox