import io from 'socket.io-client'
import { editSessionAction, setIncominDrawingAction, setRivalAction } from './actions/gameAction'

const serverUrl = process.env.REACT_APP_SERVER_URL
let socket = null
export const connectSocket = (nickname) => {
    socket = io(serverUrl, {withCredentials: true,extraHeaders: {
        nickname
        }})
}

export const setOnlinePlayers = (setPlayers) => {
    socket.on('online-users', (players) => {
        setPlayers(players.filter((player) => player.id !== socket.id))
    })
}

export const sendDrawingSocket = (socketId, drawing, session) => {
    socket.emit('send-drawing', socketId, drawing, session)
}

export const resciveDrawingSocket = (dispatch) => {
    socket.on('rescive-drawing', ({ drawing, socketId, session }) => {
        dispatch(setIncominDrawingAction({ drawing, socketId }))
        dispatch(editSessionAction(session))
    })
}

export const disconnectSocket = (session)=>{
    socket.emit('update-score', session)
    socket.disconnect()
}

export const rivalDisconnectedListener = (rival, dispatch, navigate) => {
    socket.on('user-disconnected', (rivalId) => {
        if (rival?.id === rivalId)
            dispatch(setRivalAction(null))
            navigate("/game-ended")
    })
}