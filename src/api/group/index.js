import trelloClient from '../../utils/trelloClient';
import axios from "axios";

const boardId = process.env.REACT_APP_BOARD_ID;

export const getGroups = async () => {
    try {
        const response = await trelloClient.get(`/boards/${boardId}/groups`);
        return response.data;
    } catch (e) {
        return e;
    }
}

export const createGroup = async (payload) => {
    try {
        const response = await trelloClient.post(`/boards/${boardId}/groups`, payload);
        return response.data;
    } catch (e) {
        return e;
    }
}

export const deleteGroup = async (payload) => {
    try {
        await axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}/boards/${boardId}/groups`,
            data: payload,
            headers: {
                'Access-Token' : process.env.REACT_APP_ACCESS_TOKEN,
                'Content-type': 'application/json',
            },
        });
    } catch (e) {
        return e;
    }
}

export const updateGroup = async (payload) => {
    try {
        const response = await trelloClient.put(`/boards/${boardId}/groups`, payload);
        return response.data;
    } catch (e) {
        return e;
    }
}