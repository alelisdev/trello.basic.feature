import React, { useState, useEffect, useContext, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useBlurSetState from "../hooks/useBlurSetState";
import { addList, onDragEnd } from "../static/js/board";
import List from "../components/boards/List";
import globalContext from "../context/globalContext";
import * as groupAPI from '../api/group';
import * as taskAPI from '../api/task';
import { BoardSkeleton } from "../components/boards/BoardSkeleton";

const Board = (props) => {
    const { id } = props.match.params;
    const [loading, setLoading] = useState(true);
    const [addingList, setAddingList] = useState(false);
    const [board, setBoard] = useState([]);

    const fetchBoard = useCallback(async () => {
        const temp = [];
        const gRes = await groupAPI.getGroups();
        const tRes = await taskAPI.getTasks();
        gRes.map((item) => {
            const res = tRes.filter((task) => task.groupDto !== null && task.groupDto.id === item.id);
            item.tasks = res;
            temp.push(item);
        })
        setBoard(temp);
        setLoading(false);
    }, [])

    useEffect(() => {
        setLoading(true);
        fetchBoard();
    }, [])

    const { setBoardContext } = useContext(globalContext);
    
    useEffect(() => {
        if (board) {
            setBoardContext(board, setBoard);
        }
    }, [board]);

    useDocumentTitle("Board | Trello");
    useBlurSetState(".board__create-list-form", addingList, setAddingList);
    const [editingTitle, setEditingTitle] = useState(false);
    useBlurSetState(".board__title-edit", editingTitle, setEditingTitle);

    if(loading) {
        return (
            <div className='container'>
                <BoardSkeleton count={4} />
            </div> 
        )
    }

    return (
        <div className="board">
            {!editingTitle ? (
                <p
                    className="board__title"
                    onClick={() => setEditingTitle(true)}
                    style={{ color: "white" }}
                >
                    {board.title}
                </p>
            ) : (
                <EditBoard
                    setEditingTitle={setEditingTitle}
                    board={board}
                    setBoard={setBoard}
                />
            )}

            <DragDropContext onDragEnd={onDragEnd(board, setBoard)}>
                <Droppable
                    droppableId={"board" + id.toString()}
                    direction="horizontal"
                    type="list"
                >
                    {(provided) => (
                        <div
                            className="board__lists"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {addingList ? (
                                <CreateList
                                    board={board}
                                    setBoard={setBoard}
                                    setAddingList={setAddingList}
                                />
                            ) : (
                                <button
                                    className="btn board__create-list"
                                    onClick={() => setAddingList(true)}
                                    style={
                                        board?.length === 0
                                            ? { marginLeft: 0 }
                                            : null
                                    }
                                >
                                    <i className="fal fa-plus"></i>
                                    Add{" "}
                                    {board?.length === 0
                                        ? "a"
                                        : "another"}{" "}
                                    list
                                </button>
                            )}
                            {board?.map((group, index) => (
                                <List
                                    list={group}
                                    index={index}
                                    key={uuidv4()}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

const CreateList = ({ board, setBoard, setAddingList }) => {
    const [title, setTitle] = useState("");

    const onAddList = async (e) => {
        e.preventDefault();
        const data = await groupAPI.createGroup({ name: title });
        addList(board, setBoard)(data);
        setAddingList(false);
    };

    return (
        <form className="board__create-list-form" onSubmit={onAddList}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="title"
                placeholder="Enter list title"
            />
            {title.trim() !== "" ? (
                <button type="submit" className="btn btn--small">
                    Add List
                </button>
            ) : (
                <button
                    type="submit"
                    className="btn btn--small btn--disabled"
                    disabled
                >
                    Add List
                </button>
            )}
        </form>
    );
};

const EditBoard = ({ board, setBoard, setEditingTitle }) => {
    const [title, setTitle] = useState(board.title);

    const onEditTitle = async (e) => {
        e.preventDefault();
        if (title.trim() === "") return;
        const { data } = await groupAPI.createGroup({title});
        setBoard(data);
        setEditingTitle(false);
    };

    return (
        <form onSubmit={onEditTitle}>
            <input
                className="board__title-edit"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="title"
                placeholder="Enter board title"
            />
        </form>
    );
};

export default Board;
