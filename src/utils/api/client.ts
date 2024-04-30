import { AxiosResponse } from 'axios';
import axios from 'axios'

export const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const setAuthorizationHeader = (token: string) =>
    (client.defaults.headers.common['Authorization'] = `Bearer ${token}`);

export const removeAuthorizationHeader = () => {
    delete client.defaults.headers.common['Authorization'];
};
client.interceptors.response.use((response: AxiosResponse): AxiosResponse => response)

