import { getLoginInfo } from "@/uses"
import { message } from "antd"
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"


const requestHeaderInterceptor = (config: InternalAxiosRequestConfig<any>) => {

  //认证状态
  let info = getLoginInfo()
  if (info) {
    config.headers["x-user-id"] = info.principal.id
    config.headers["x-user-type"] = info.principal.type
    config.headers["Authentication"] = info.tokenType + " " + info.accessToken
  }
  return config;
}


export interface ApiResult<T> {
  status: boolean
  code: string
  msg: string
  err: string
  data: T
  currentTime: number
}

const responseInterceptor = (response: AxiosResponse<any, any>) => {
  //协议
  if (response.status !== 200) {
    message.error(response.statusText);
    return Promise.reject(new Error(response.statusText))
  }
  //业务
  let apiResult = response.data as ApiResult<any>
  if (!apiResult.status) {
    message.error(apiResult.err);
    return Promise.reject(new Error(apiResult.err))
  }
  //直接处理业务数据
  return apiResult
}


export const AuthClient = axios.create({
  baseURL: process.env.AUTH_HOST,
  headers: {
    //应用信息
    "x-tenant-id": process.env.TENANT_ID,
    "x-app-id": process.env.APP_ID,
    //认证统一使用form提交
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': "Basic " + process.env.AUTH_CLIENT_BASIC
  },
  timeout: Number(process.env.AUTH_TIMEOUT || 60000),
  withCredentials: false
})

AuthClient.interceptors.response.use(responseInterceptor)


export const DefaultClient = axios.create({
  baseURL: process.env.DEFAULT_HOST,
  headers: {
    //应用信息
    "x-tenant-id": process.env.TENANT_ID,
    "x-app-id": process.env.APP_ID,
    'Content-Type': 'application/json;charset=utf-8'
  },
  timeout: Number(process.env.DEFAULT_TIMEOUT || 60000),
  withCredentials: false
})
DefaultClient.interceptors.request.use(requestHeaderInterceptor)
DefaultClient.interceptors.response.use(responseInterceptor)

