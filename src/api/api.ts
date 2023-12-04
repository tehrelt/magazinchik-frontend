import axios, {AxiosRequestConfig} from "axios";
import exp from "constants";

class Api {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async get(path: string) {
        console.log(`get on ${this.url}/${path}`)
        try {
            const response = await axios.get(`${this.url}/${path}`);
            return response.data
        } catch (error: any) {
            throw error
        }
    }

    async post<T>(path: string, data: T) {
        console.log(`post on ${this.url}/${path}`)
        try {
            const response = await axios.post(`${this.url}/${path}`, data);
            return response.data
        } catch (error: any) {
            throw error
        }
    }

    async postWithFormData(path: string, data: any, headers: AxiosRequestConfig) {
        console.log(`post on ${this.url}/${path}`);
        try {
            const response = await axios.post(`${this.url}/${path}`, data, headers)
            return response.data;
        } catch (e: any) {
            throw e;
        }
    }

    async delete(path: string) {
        console.log(`delete on ${this.url}/${path}`)
        try {
            const response = await axios.delete(`${this.url}/${path}`);
            return response.data
        } catch (error: any) {
            throw error
        }
    }

    async update(path: string, data: any) {
        console.log(`put on ${this.url}/${path}`)
        try {
            const response = await axios.put(`${this.url}/${path}`, data)
            return response.data;
        } catch (error: any) {
            throw error
        }
    }
}


export const api = new Api("http://localhost:5178/api/v1")










