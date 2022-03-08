import { AxiosResponse } from 'axios'

export interface LogInCredentials {
  username: string
  password: string
}

export type LogInSuccess = {
  message: string
}
export type LogInFailure = {
  message: string
  code?: string
}

export type LogInResponse = AxiosResponse<LogInSuccess, LogInFailure>
