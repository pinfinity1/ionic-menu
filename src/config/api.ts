import axios from 'axios';


const API_BASE_URL = 'https://greenfastfood.cocoadownload.com/api/v1/';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export default api;
