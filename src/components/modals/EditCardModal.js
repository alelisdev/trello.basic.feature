import React, { useEffect, useState, useContext } from "react";
import useBlurSetState from "../../hooks/useBlurSetState";
import globalContext from "../../context/globalContext";
import { modalBlurHandler } from "../../static/js/util";
import { updateCard } from "../../static/js/board";
import * as taskAPI from '../../api/task';

const EditCardModal = ({ card, list, setShowModal }) => {
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);

    useEffect(modalBlurHandler(setShowModal), []);
    useBlurSetState(".edit-modal__title-edit", editingTitle, setEditingTitle);
    useBlurSetState(
        ".edit-modal__form",
        editingDescription,
        setEditingDescription
    );

    return (
        <div className="edit-modal">
            <button
                className="edit-modal__exit"
                onClick={() => setShowModal(false)}
            >
                <i className="fal fa-times"></i>
            </button>
            <div className="edit-modal__cols">
                <div className="edit-modal__left">
                    {!editingTitle ? (
                        <p
                            onClick={() => setEditingTitle(true)}
                            className="edit-modal__title"
                        >
                            {card.name}
                        </p>
                    ) : (
                        <EditCardTitle
                            list={list}
                            card={card}
                            setEditingTitle={setEditingTitle}
                        />
                    )}
                    <div className="edit-modal__subtitle">
                        in Group <span>{list.name}</span>
                    </div>

                    <div className="edit-modal__section-header">
                        <div>
                            <i className="fal fa-file-alt"></i> Body
                        </div>
                        {card.body !== "" && (
                            <div>
                                <button
                                    className="btn btn--secondary btn--small"
                                    onClick={() => setEditingDescription(true)}
                                >
                                    <i className="fal fa-pencil"></i> Edit
                                </button>
                            </div>
                        )}
                    </div>

                    {card.body !== "" && !editingDescription && (
                        <p className="edit-modal__description">
                            {card.body}
                        </p>
                    )}

                    {editingDescription ? (
                        <EditCardDescription
                            list={list}
                            card={card}
                            setEditingDescription={setEditingDescription}
                        />
                    ) : (
                        card.description === "" && (
                            <button
                                className="btn btn--secondary btn--small btn--description"
                                onClick={() => setEditingDescription(true)}
                            >
                                Add description
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

const EditCardTitle = ({ list, card, setEditingTitle }) => {
    const { board, setBoard } = useContext(globalContext);
    const [title, setTitle] = useState(card.name);

    useEffect(() => {
        const titleInput = document.querySelector(".edit-modal__title-edit");
        titleInput.focus();
        titleInput.select();
    }, []);

    const onEditTitle = async (e) => {
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
        setEditingTitle(false);
        updateCard(board, setBoard)(list.id, data);
    };

    return (
        <form onSubmit={onEditTitle}>
            <input
                className="edit-modal__title-edit"
                type="text"
                name="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            ></input>
        </form>
    );
};

const EditCardDescription = ({ list, card, setEditingDescription }) => {
    const { board, setBoard } = useContext(globalContext);
    const [ body, setBody] = useState(card.body);

    const onEditDesc = async (e) => {
        e.preventDefault();
        if (body.trim() === "") return;
        const data = await taskAPI.updateTask({
            id: card.id,
            name: card.name,
            body: body,
            groupDto: {
                id: list.id,
                name: list.name,
                description: list.description
            }
        });
        setEditingDescription(false);
        updateCard(board, setBoard)(list.id, data);
    };

    return (
        <form className="edit-modal__form" onSubmit={onEditDesc}>
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Add description..."
            ></textarea>
            {typeof body == 'string' && body.trim() !== "" && (
                <button type="submit" className="btn btn--small">
                    Save
                </button>
            )}
        </form>
    );
};

export default EditCardModal;
