import axios from "axios";

const API_HOST = process.env.REACT_APP_API_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;


const trelloClient = axios.create({
    baseURL: API_HOST,
    headers: {
        'Access-Token' : ACCESS_TOKEN,
        'Content-type': 'application/json',
    },
    timeout: 10000,
});

export default trelloClient;