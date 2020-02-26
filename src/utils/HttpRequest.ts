
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
const API_URL='https://api.themoviedb.org/'
export default function request(url: string,method:any, data?: AxiosRequestConfig) {

    return axios.request({
        url: url,
        baseURL: API_URL,
        method:method,
        headers: {
            'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlck5hbWUiOiJhZG1pbiIsInBhc3NXb3JkIjoiMTIzNCIsImZ1bGxOYW1lIjoiYWRtaW4gYWRtaW4iLCJpc0FkbWluIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIwLTAyLTIwVDAwOjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTAyLTIwVDAwOjAwOjAwLjAwMFoiLCJpYXQiOjE1ODIyMjEwODN9.yTYV5cmyIap1W7SxmPco1ioDrlSUwk4p8syGN_cU4_I'
        },
    }).then((result: AxiosResponse) => {
        return Promise.resolve(result);

    }).catch((err: AxiosError) => {
        /*return Promise.reject({
            IsError: true,
            ...err
        });*/
    });
}
