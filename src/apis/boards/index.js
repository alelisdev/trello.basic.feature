import trelloClient from '../../utils/apiClient';

const boardId = process.env.REACT_APP_BOARD_ID;

export const getBoards = async () => {
    try {
        const response = await trelloClient.get(`/boards/${boardId}/groups`);
        return response.data;
    } catch (e) {
        return e;
    }
}

export const addBoard = async (payload) => {
    const response = await trelloClient.post(`/boards/${boardId}/groups`, payload);
    console.log(response)
}

export const deleteBoard = async (payload) => {
    const response = await trelloClient.delete(`/boards/${boardId}/groups`, payload);
    console.log(response)
}