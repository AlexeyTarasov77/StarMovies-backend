import { Response } from "express"

interface IResponseSuccess<T> {
  success: true,
  data: T
}

interface IResponseError {
  success: false,
  message: string
}

export function sendSuccessfulResponse<T>(res: Response, data: T, status?: number) {
  const respData: IResponseSuccess<T> = { success: true, data }
  return res.status(status || 200).json(respData)
}

export function sendErrorResponse(res: Response, message: string, status?: number) {
  const respData: IResponseError = { success: false, message }
  return res.status(status || 400).json(respData)
}
