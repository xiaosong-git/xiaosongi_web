import axios from 'axios';
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    /*baseURL: 'http://127.0.0.1:80', // 配置axios接口路径*/
    baseURL: 'http://127.0.0.1:80/', // 配置axios接口路径
    timeout: 20000
});
// 配置请求拦截器
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);
// 配置响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            return Promise.reject(error);
        }
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);
export default service;
// 请求封装位置
