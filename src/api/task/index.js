import trelloClient from '../../utils/trelloClient';
import axios from 'axios';

const boardId = process.env.REACT_APP_BOARD_ID;

export const getTasks = async () => {
    try {
        const response = await trelloClient.get(`/boards/${boardId}/tasks`);
        return response.data;
    } catch (e) {
        return e;
    }
}

export const addTask = async (payload) => {
    try {
        const response = await trelloClient.post(`/boards/${boardId}/tasks`, payload);
        return response.data;
    } catch (e) {
        return e;
    }
}

export const deleteTask = async (payload) => {
    try {
        await axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}/boards/${boardId}/tasks`,
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

export const updateTask = async (payload) => {
    try {
        const response = await trelloClient.put(`/boards/${boardId}/tasks`, payload);
        return response.data;
    } catch (e) {
        return e;
    }
}