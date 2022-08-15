import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as boardsApi from '../apis/boards';
import { BoardsPageSkeleton } from "../components/BoardsPageSkeleton";
import { BoardTitle } from '../components/BoardTitle';
import { BoardNewModal, BoardDeleteModal } from '../components/BoardModal';

export default function NotFoundPage () {

    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [curId, setCurId] = useState('');
    const navigate = useNavigate();

    const fetchBoards = async () => {
        const res = await boardsApi.getBoards();
        setBoards(res);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchBoards();
    }, []);


    const addBoard = async (board) => {
        await boardsApi.addBoard(board);
        boards.push(board);
        setModalVisible(false);
    };

    const handleEdit = (id) => {
        setCurId(id);
    }

    const handleDelete = (id) => {
        setCurId(id);
        setModalDeleteVisible(true)
       
    }

    const deleteBoard = async (id) => {
        await boardsApi.deleteBoard({id: id});
    }

    if (loading) {
        return <BoardsPageSkeleton count={4} />;
    }

    return (
        <div className='pt-16 py-4 px-3'>
            <div className="flex mb-3 items-center">
                <div className='mx-2'>Personal Boards</div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-sm-6 col-sx-12 my-3">
                    <BoardTitle
                        title="+ Add new board"
                        description="Open the new board Modal to create new Board."
                        addition={true}
                        handleBoardClick={() => setModalVisible(true)}
                    />
                </div>
                {boards.map((board, idx) => (
                    <div className="col-lg-3 col-sm-6 col-sx-12 my-3" key={idx} >
                        <BoardTitle
                            title={board.name}
                            description={board.description}
                            handleDelete={() => handleDelete(board?.id)}
                            handleEdit={() => handleEdit(board?.id)}
                            handleBoardClick={() => navigate(`boards/${board?.id}`)}
                        />
                    </div>
                ))}
            </div>

            <BoardNewModal
                action={addBoard}
                closeModal={() => setModalVisible(false)}
                visible={modalVisible}
            />
            <BoardDeleteModal
                action={() => deleteBoard(curId)}
                closeModal={() => setModalDeleteVisible(false)}
                visible={modalDeleteVisible}
            />
        </div>
    );
}