
import { message } from 'ant-design-vue';
import axios from "axios";

const httpInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,
    withCredentials: true
});

// 添加请求拦截器
httpInstance.interceptors.request.use(config =>{
    return config
}, error => {
    // 对请求错误做些什么;b,mv/hlo
    console.log("请求错误",error)
    return Promise.reject(error);
});

// 添加响应拦截器
httpInstance.interceptors.response.use(response=>{
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
}, error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log("响应错误",error)
    message.error("服务器错误："+error.message)
    return Promise.reject(error);
});

export default httpInstance;
