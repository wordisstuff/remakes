import axios from 'axios';

// const urla = 'https://67a4109531d0d3a6b7854249.mockapi.io/songs';

const urla = 'http://localhost:8080';

export const setAuthHeader = token => {
    songApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearAuthHeader = () => {
    delete songApi.defaults.headers.common.Authorization;
};

export const songApi = axios.create({
    baseURL: urla,
    withCredentials: true,
});
