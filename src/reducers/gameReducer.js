export const initialState = {
    selectedWord: null,
    nickname: "",
    rival: null,
    incomingDrawing: { drawing: null, socketId: "" },
    session: { totalTime: null, totalScore: null }

}

export const actions = {
    SELECT_WORD: 'SELECT_WORD',
    SET_NICKNAME: 'SET_NICKNAME',
    SET_RIVAL: 'SET_RIVAL',
    SET_INCOMING_DAWING: 'SET_INCOMING_DRAWING',
    CLEAD_DRAWING: 'CLEAN_DRAWING',
    EDIT_SESSION: 'EDIT_SESSION',
    RESET_STATE: 'RESET_STATE'

}

const gameReducer = (state, action) => {
    switch (action.type) {
        case actions.SELECT_WORD:
            return { ...state, selectedWord: action.payload }
        case actions.SET_NICKNAME:
            return { ...state, nickname: action.payload }
        case actions.SET_RIVAL:
            return { ...state, rival: action.payload }
        case actions.SET_INCOMING_DAWING:
            return { ...state, incomingDrawing: action.payload }
        case actions.CLEAD_DRAWING:
            return { ...state, incomingDrawing: { drawing: null, socketId: "" } }
        case actions.EDIT_SESSION:
            return { ...state, session: action.payload }
        case actions.RESET_STATE:
            return { ...initialState }
        default:
            return { ...state }
    }
}

export default gameReducer