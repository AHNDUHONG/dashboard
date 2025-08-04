import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = token.startsWith('Bearer ')
            ? token
            : `Bearer ${token}`;
    }
    return config;
});

export default instance;