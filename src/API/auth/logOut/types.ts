import { AxiosResponse } from 'axios'

export type LogOutSuccess = {
  message: string
}
export type LogOutFailure = {
  message: string
}

export type LogOutResponse = AxiosResponse<LogOutSuccess, LogOutFailure>
