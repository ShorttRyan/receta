import { AxiosResponse } from 'axios'

export type LogOutSuccess = {
  message: string
}
export type LogOutFailure = {
  message: string
}

export type LogInResponse = AxiosResponse<LogOutSuccess, LogOutFailure>
