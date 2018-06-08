/**
 * Created by yezi on 2017/12/19.
 */
'use strict';

import axios from 'axios';
import {baseurl} from "@/config/baseURL.js"


axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = baseurl

let axiosIns = axios.create({withCredentials:true,params:{}});


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log(config);
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response);
  // 对响应数据做点什么
  let resData = response;
  let rt = resData.data;
  return rt;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

let exAxios = axios;

export default exAxios;
