import axios from 'axios';

const urla = () =>
    window.location.hostname === 'localhost'
        ? 'http://localhost:8080'
        : 'https://remakes-back.onrender.com';

export const setAuthHeader = token => {
    songApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearAuthHeader = () => {
    delete songApi.defaults.headers.common.Authorization;
};

export const songApi = axios.create({
    baseURL: urla(),
    withCredentials: true,
    onUploadProgress: progressEvent => {
        const completed = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
        );
        console.log(`${completed}%`);
    },
});
