import axios from "axios";

const urla = "https://67a4109531d0d3a6b7854249.mockapi.io/"

export const songApi = axios.create({
    baseURL: urla,
    withCredentials: true,
});