import axios from "../utils/axios";

export const register = async (data: { username: string; email: string; password: string }) => {
    return axios.post("/auth/register", data);
};

export const login = async (data: { username: string; password: string }) => {
    return axios.post("/auth/login", data);
};

export const refreshToken = async () => {
    return axios.post("/auth/refresh");
};

export const logoutUser = async () => {
    return axios.post("/auth/logout");
};
