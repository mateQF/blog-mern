import axios from "axios";

export const customAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000
})
