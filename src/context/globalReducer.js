export const SET_BOARD_CONTEXT = "SET_BOARD_CONTEXT";

export const globalReducer = (state, action) => {
    switch (action.type) {
        case SET_BOARD_CONTEXT:
            return { ...state, board: action.board, setBoard: action.setBoard };
        default:
            return state;
    }
};
