import axios from 'axios';


const API_BASE_URL = 'https://localhost:8080/api/v1/';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export default api;
