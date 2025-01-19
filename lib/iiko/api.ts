import axios from "axios"
import * as process from "node:process";
import {axiosToCurl} from "./utils";

const isDev = process.env.NODE_ENV === "development"

const http = axios.create({
    baseURL: process.env.IIKO_BASE_URL + '/1',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})

http.interceptors.request.use(function (config) {
    config["headers"]["Authorization"] = `Bearer ${token}`

    if (config.method !== 'get' && !config.data.organizationId) {
        config.data = {
            ...config.data,
            organizationId: process.env.IIKO_ORGANIZATION,
        };
    }
    console.log('curl')
    console.log(axiosToCurl(config));
    return config;
})

http.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response?.status === 401) {
            // return (window.location.href = "/login")
        }
        // return Promise.reject(error)
        throw error;
    }
)

export default http

const auth = axios.create({
    baseURL: process.env.IIKO_BASE_URL,
    withCredentials: true,
})

let token: string | null = process.env.IIKO_TOKEN || null;
export const setToken = (accessToken: string, refreshToken: string) => {
    token = accessToken
    if (isDev) {
        localStorage.setItem("refreshToken", refreshToken)
    }
}

export const getAccessToken = async () => {
    const data = isDev
        ? { refreshToken: localStorage.getItem("refreshToken") }
        : null

    const {
        data: { accessToken },
    } = await auth.post<{ accessToken: string }>("/auth/refresh", data, {
        withCredentials: true,
    })
    return (token = accessToken)
}
