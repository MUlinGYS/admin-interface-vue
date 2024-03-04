import axios from 'axios';

const instanc = axios.create({
baseURL: ' http://localhost:80',
});


// 添加请求拦截器
// instanc.interceptors.request.use(
// (config) => {
// // 在发送请求之前做
// console.log('请求拦截器：', config);
// return config;
// },
// (error) => {
// // 对请求错误做
// return Promise.reject(error);
// }
// );

// 添加响应拦截器
instanc.interceptors.response.use(
(response) => {
// 对响应数据做
// console.log('响应拦截器：', response);
return response.data;
},
(error) => {
// 对响应错误做
return Promise.reject(error);
}
);

export function instance(url,params) {
return instanc.get(url,{params});
}

//mock假数据请求使用
const http = axios.create({
baseURL: '/api',
});

export default http