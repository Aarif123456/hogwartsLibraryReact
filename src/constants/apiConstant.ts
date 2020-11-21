import axios from 'axios';

export const API = 'https://arif115.myweb.cs.uwindsor.ca/hogwartslibrary/api/';

export const instance = axios.create({
    withCredentials: true,
    baseURL: API
});
