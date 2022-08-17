import React, { useReducer } from "react";
import globalContext from "./globalContext";
import {
    globalReducer,
    SET_BOARD_CONTEXT,
} from "./globalReducer";

const GlobalProvider = (props) => {
    const [globalState, dispatch] = useReducer(globalReducer, {
        board: null,
        setBoard: null,
    });

    const setBoardContext = (board, setBoard) => {
        dispatch({ type: SET_BOARD_CONTEXT, board, setBoard });
    };

    return (
        <globalContext.Provider
            value={{
                board: globalState.board,
                setBoard: globalState.setBoard,
                setBoardContext,
            }}
        >
            {props.children}
        </globalContext.Provider>
    );
};

export default GlobalProvider;
