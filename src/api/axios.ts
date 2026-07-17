import axios from "axios";
import { API_URL } from "../constants/app";
import { getAccessToken } from "../utils/tokenStorage";

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,

    headers: {
        "Content-Type" : "application/json",
    }
});

//모든 요청에  accessToken 붙이기
api.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if(token) {
        config.headers.Authorization = 'Bearer ${token}';
    }
    return config;
})

export default api;