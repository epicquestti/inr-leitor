import axios, { AxiosInstance, AxiosResponse } from "axios"

const apiInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api"
})

export const GET = async (url: string): Promise<any> => {
  try {
    const responseHttpRequest: AxiosResponse<any> = await apiInstance.get(url)
    if (responseHttpRequest.status === 200) return responseHttpRequest.data
  } catch (error) {
    return false
  }
}

export const POST = async (url: string, body?: any): Promise<any> => {
  try {
    let responseHttpRequest: AxiosResponse<any>

    if (body) responseHttpRequest = await apiInstance.post(url, body)
    else responseHttpRequest = await apiInstance.post(url)

    if (responseHttpRequest.status === 200) return responseHttpRequest.data
  } catch (error) {
    return { error }
  }
}

export const PUT = async (url: string, body?: any): Promise<any> => {
  try {
    let responseHttpRequest: AxiosResponse<any>

    if (body) responseHttpRequest = await apiInstance.put(url, body)
    else responseHttpRequest = await apiInstance.put(url)

    if (responseHttpRequest.status === 200) return responseHttpRequest.data
  } catch (error) {
    return { error }
  }
}

export const DELETE = async (url: string, body?: any): Promise<any> => {
  try {
    let responseHttpRequest: AxiosResponse<any>

    if (body) responseHttpRequest = await apiInstance.delete(url)
    else responseHttpRequest = await apiInstance.delete(url)

    if (responseHttpRequest.status === 200) return responseHttpRequest.data
  } catch (error) {
    return { error }
  }
}
