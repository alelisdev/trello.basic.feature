import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export const BoardNewModal = (props) => {
    const { closeModal, action, visible } = props;
    const [boardTitle, setBoardTitle] = useState('');
    const [boardDesc, setBoardDesc] = useState('');
    const [loading, setLoading] = useState(false);

    const isEmptyText = (text) => !text || !text.trim();

    const handleCreateBoard = async (event) => {
        setLoading(true);
        event.preventDefault();
        if (isEmptyText(boardTitle)) {
            return;
        }
        await action({
            title: boardTitle,
            description: boardDesc
        });
        setBoardTitle('');
        setBoardDesc('')
        setLoading(false);
    };

    return (
        <Modal
            size="sm"
            show={visible}
            onHide={closeModal}
            aria-labelledby="example-modal-sizes-title-sm"
        >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
             New Board
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className={`w-full`} onSubmit={(event) => handleCreateBoard(event)}>
                <Form.Control
                    type='text'
                    className={`mb-3`}
                    placeholder="Title"
                    onChange={(event) => setBoardTitle(event.target.value)}
                    value={boardTitle}
                />
                <Form.Control 
                    as="textarea" 
                    className='mb-3'
                    rows={3} 
                    placeholder="Description" 
                    onChange={(event) => setBoardDesc(event.target.value)} 
                    value={boardDesc} 
                />
                <Button
                    className='btn-board'
                    onClick={(event) => handleCreateBoard(event)}
                    loading={loading}
                    disabled={isEmptyText(boardTitle)}
                >
                    Add New
                </Button>
            </form>
        </Modal.Body>
      </Modal>
    );
};

BoardNewModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};


export const BoardDeleteModal = (props) => {
    const { closeModal, action, visible } = props;
    const [loading, setLoading] = useState(false);

    const handleDeleteBoard = async () => {
        setLoading(true);
        await action();
    };

    return (
        <Modal
            size="sm"
            show={visible}
            onHide={closeModal}
            aria-labelledby="example-modal-sizes-title-sm"
        >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
             Delete This Board?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Button
                className="btn-board"
                onClick={() => handleDeleteBoard()}
                loading={loading}
            >
                Delete
            </Button>
        </Modal.Body>
      </Modal>
    );
};

BoardDeleteModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};
