import React, { useState, useRef, useContext } from "react";
import { mergeRefs } from "../../static/js/util";
import EditCardModal from "../modals/EditCardModal";
import { updateCard } from "../../static/js/board";
import globalContext from "../../context/globalContext";
import * as taskAPI from '../../api/task';

const getCardStyle = (isDragging, isEditing, defaultStyle) => {
    if (isEditing) {
        return {
            cursor: "auto",
        };
    }
    if (!isDragging)
        return {
            ...defaultStyle,
            cursor: "pointer",
        };
    return {
        ...defaultStyle,
        transform: defaultStyle.transform + " rotate(5deg)",
        cursor: "grabbing",
    };
};

const Card = ({ card, list, provided, isDragging }) => {
    const { board, setBoard } = useContext(globalContext);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(card.name);

    const [showEditModal, setShowEditModal] = useState(false);

    const cardElem = useRef(null);

    const handleCardClick = (e) => {
        if (isEditing) return;
        if (e.target.className.includes("pen")) return;
        setShowEditModal(true);
    };
    
    const onEditCard = async (e) => {
        e.preventDefault();
        if (title.trim() === "") return;
        const data = await taskAPI.updateTask({
            id: card.id,
            name: title,
            body: card.body,
            groupDto: {
                id: list.id,
                name: list.name,
                description: list.description
            }
        });
        setIsEditing(false);
        updateCard(board, setBoard)(list.id, data);
    };

    const { innerRef, draggableProps, dragHandleProps } = provided;
    return (
        <>
            <div
                className={`card${
                    isEditing ? " card--edit" : ""
                }`}
                ref={mergeRefs(cardElem, innerRef)}
                onClick={handleCardClick}
                {...draggableProps}
                style={getCardStyle(
                    isDragging,
                    isEditing,
                    draggableProps.style
                )}
                {...dragHandleProps}
            >
                <div>
                    {!isEditing && (
                        <button
                            className="card__pen"
                            onClick={() => setIsEditing(true)}
                        >
                            <i className="fal fa-pen"></i>
                        </button>
                        
                    )}
                    {isEditing ? (
                        <form onSubmit={onEditCard}>
                            <input
                                className="card__title-edit"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </form>
                    ) : (
                        <p className="card__title">{card.name}</p>
                    )}
                    <p className="card__subtitle">
                        <i className="fal fa-paperclip"></i>{" "}
                        {card.body}
                    </p>
                </div>
                
            </div>
            {showEditModal && (
                <EditCardModal
                    card={card}
                    setShowModal={setShowEditModal}
                    list={list}
                />
            )}
        </>
    );
};


export default Card;
