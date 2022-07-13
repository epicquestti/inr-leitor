import axios, { AxiosInstance, AxiosResponse } from "axios"
import config from "../../config/app"

const apiInstance: AxiosInstance = axios.create({
  baseURL: config.api.inr.base
})

export const GET = async (url: string): Promise<any> => {
  try {
    const responseHttpRequest: AxiosResponse<any> = await apiInstance.get(url)
    if (responseHttpRequest.status === 200) return responseHttpRequest.data
  } catch (error: any) {
    return { error: error.message }
  }
}

export const POST = async (url: string, body?: any): Promise<any> => {
  try {
    let responseHttpRequest: AxiosResponse<any>

    if (body) responseHttpRequest = await apiInstance.post(url, body)
    else responseHttpRequest = await apiInstance.post(url)

    if (responseHttpRequest.status === 200) return responseHttpRequest.data
  } catch (error: any) {
    return { error: error.message }
  }
}

export const PUT = async (url: string, body?: any): Promise<any> => {
  try {
    let responseHttpRequest: AxiosResponse<any>

    if (body) responseHttpRequest = await apiInstance.put(url, body)
    else responseHttpRequest = await apiInstance.put(url)

    if (responseHttpRequest.status === 200) return responseHttpRequest.data
  } catch (error: any) {
    return { error: error.message }
  }
}

export const DELETE = async (url: string): Promise<any> => {
  try {
    const responseHttpRequest: AxiosResponse<any> = await apiInstance.delete(
      url
    )
    if (responseHttpRequest.status === 200) return responseHttpRequest.data
  } catch (error: any) {
    return { error: error.message }
  }
}
