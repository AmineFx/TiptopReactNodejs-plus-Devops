import axios from "axios";

const API = import.meta.env.VITE_APP_API_URL || "";

export const apiGlobal = axios.create({
    baseURL: API,
});

