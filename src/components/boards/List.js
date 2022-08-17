import React, { useState, useRef, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import useBlurSetState from "../../hooks/useBlurSetState";
import { mergeRefs } from "../../static/js/util";
import { updateList, addCard, deleteList } from "../../static/js/board";
import globalContext from "../../context/globalContext";
import * as taskAPI from '../../api/task';
import * as groupAPI from '../../api/group';

const getListStyle = (isDragging, defaultStyle) => {
    if (!isDragging) return defaultStyle;
    return {
        ...defaultStyle,
        transform: defaultStyle.transform + " rotate(5deg)",
    };
};

const getListTitleStyle = (isDragging, defaultStyle) => {
    if (!isDragging)
        return {
            ...defaultStyle,
            cursor: "pointer",
        };
    return {
        ...defaultStyle,
        cursor: "grabbing",
    };
};

const INITIAL_STATE = {
    name: '',
    description: ''
}

const List = ({ list, index }) => {
    const { board, setBoard } = useContext(globalContext);
    const [addingCard, setAddingCard] = useState(false);
    const [card, setCard] = useState(INITIAL_STATE);
    const [editingTitle, setEditingTitle] = useState(false);

    useBlurSetState(".list__add-card-form", addingCard, setAddingCard);
    useBlurSetState(".list__title-edit", editingTitle, setEditingTitle);

    const handleCardChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setCard(prevState => ({ ...prevState, [name]: value }));
    }

    const handleDeleteList = async (list) => {
        await groupAPI.deleteGroup({
            id: list.id,
            name: list.name,
            description: list.description
        })
        deleteList(board, setBoard)(list);
    }

    const onAddCard = async (e) => {
        e.preventDefault();
        if (card.name.trim() === "") return;
        const data = await taskAPI.addTask({ 
            name: card.name, 
            body: card.body, 
            groupDto: { 
                id: list.id,
                name: list.name,
                description: list.description
            }
        })
        setAddingCard(false);
        addCard(board, setBoard)(list.id, data);
    };

    const listCards = useRef(null);

    useEffect(() => {
        if (addingCard)
            listCards.current.scrollTop = listCards.current.scrollHeight;
    }, [addingCard]);



    useEffect(() => {
        if (editingTitle) {
            const editListTitle = document.querySelector(".list__title-edit");
            editListTitle.focus();
            editListTitle.select();
        }
    }, [editingTitle]);

    return (
        <Draggable draggableId={"list" + list?.id?.toString()} index={index}>
            {(provided, snapshot) => {
                if (
                    typeof provided.draggableProps.onTransitionEnd ===
                    "function"
                ) {
                    const anim = window?.requestAnimationFrame(() =>
                        provided.draggableProps.onTransitionEnd({
                            propertyName: "transform",
                        })
                    );
                }
                return (
                    <div
                        className="list"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={getListStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}
                    >
                        <div
                            className="list__title"
                            {...provided.dragHandleProps}
                            style={getListTitleStyle(
                                snapshot.isDragging,
                                provided.dragHandleProps.style
                            )}
                        >
                            {!editingTitle ? (
                                <p onClick={() => setEditingTitle(true)}>
                                    {list.name}
                                </p>
                            ) : (
                                <EditList
                                    list={list}
                                    setEditingTitle={setEditingTitle}
                                />
                            )}
                            <i className="far fa-ellipsis-h"></i>
                        </div>
                        <Droppable droppableId={list.id.toString()} type="item">
                            {(provided) => (
                                <div
                                    className="list__cards"
                                    ref={mergeRefs(
                                        provided.innerRef,
                                        listCards
                                    )}
                                    {...provided.droppableProps}
                                >
                                    {list.tasks.map((card, index) => (
                                        <DraggableCard
                                            card={card}
                                            list={list}
                                            index={index}
                                            key={uuidv4()}
                                        />
                                    ))}
                                    {provided.placeholder}
                                    {addingCard && (
                                        <AddCard
                                            onAddCard={onAddCard}
                                            handleCardChange={handleCardChange}
                                            card={card}
                                        />
                                    )}
                                </div>
                            )}
                        </Droppable>
                        {!addingCard ? (
                            <button
                                className="list__add-card"
                                onClick={() => setAddingCard(true)}
                            >
                                Add Group
                            </button>
                        ) : card.name.trim() !== "" ? (
                            <button
                                className="list__add-card list__add-card--active btn"
                                onClick={onAddCard}
                            >
                                Add
                            </button>
                        ) : (
                            <button
                                className="list__add-card list__add-card--active btn btn--disabled"
                                disabled
                            >
                                Add
                            </button>
                        )}
                        <button className="list__delete-card list__add-card--active mt-5" onClick={() => handleDeleteList(list)}>
                            Delete Group
                        </button>
                    </div>
                );
            }}
        </Draggable>
    );
};

export default List;

const AddCard = ({ onAddCard, card, handleCardChange }) => (
    <form className="list__add-card-form" onSubmit={onAddCard}>
        <input
            type="text"
            name="name"
            value={card.name}
            placeholder="Enter card title..."
            onChange={handleCardChange}
        />
        <textarea
            name="body"
            value={card.body}
            placeholder="Enter card body..."
            onChange={handleCardChange}
        />
    </form>
);

const EditList = ({ list, setEditingTitle }) => {
    const { board, setBoard } = useContext(globalContext);
    const [listTitle, setListTitle] = useState(list.name);

    const onEditList = async (e) => {
        e.preventDefault();
        if (listTitle.trim() === "") return;
        const data = await groupAPI.updateGroup({
            id: list.id,
            name: listTitle,
            description: list.description,
            groupDto: list.groupDto
        })
        updateList(board, setBoard)(data);
        setEditingTitle(false);
    };

    return (
        <form onSubmit={onEditList}>
            <input
                className="list__title-edit"
                type="text"
                name="title"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
            ></input>
        </form>
    );
};
