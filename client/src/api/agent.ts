import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "..";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configStore";


axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => {
    return response.data
};
axios.interceptors.request.use((config: any) => {
    const token = store.getState().account.user?.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});
axios.interceptors.response.use(async (response) => {
    if (process.env.NODE_ENV === 'development')
        await new Promise(resolve => setTimeout(resolve, 600));
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response;
}, (error: AxiosError) => {

    const { data, status } = error.response!;
    switch (status) {
        case 400:
            if (data.errors) {
                const errorArray: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        errorArray.push(data.errors[key])
                    }
                }
                throw errorArray.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            history.push(
                {
                    pathname: '/server-error',
                },
            )

            break;
        case 404:
            history.push(
                {
                    pathname: '/notfound',
                },

            )
            break;

        default:
            break;
    }
    // console.log('Caught by interceptor', error.message);

});
const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const catalog = {
    list: (params: URLSearchParams) => requests.get('products', params),
    detail: (id: number) => requests.get(`products/${id}`),
    fetchFilter: () => requests.get('products/filters')
}

const testError = {
    get400Error: () => requests.get('buggy/bad-request'),
    get404Error: () => requests.get('buggy/not-found'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}
const basket = {
    get: () => requests.get('basket'),
    post: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    delete: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    getCurrentUser: () => requests.get("account/currentUser")
}
const orders = {
    list: () => requests.get('orders'),
    fetch: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post('orders', values),
    fetchAddress: () => requests.get('account/savedAddress')
}
const agent = {
    catalog,
    testError,
    basket,
    account,
    orders
}

export default agent;