import { actions } from '../reducers/gameReducer'

export const updateSelectedWordAction = (word) => ({
    type: actions.SELECT_WORD,
    payload: word
})

export const setNicknameAction = (nickname) => ({
    type: actions.SET_NICKNAME,
    payload: nickname
})

export const setRivalAction = (rival) => ({
    type: actions.SET_RIVAL,
    payload: rival
})

export const setIncominDrawingAction = (drawing) => ({
    type: actions.SET_INCOMING_DAWING,
    payload: drawing
})

export const editSessionAction = (session) => ({
    type: actions.EDIT_SESSION,
    payload: session
})

export const resetStateAction = () => ({
    type: actions.RESET_STATE
})

export const CleanDrawingAction = () => ({
    type: actions.CLEAD_DRAWING
})