import axios from 'axios'
import { LogInCredentials, LogInResponse } from './types'

export * from './types'

export type LogInPost = (
  credentials: LogInCredentials,
) => Promise<[LogInResponse?, any?]>

export const logIn: LogInPost = async (credentials) => {
  try {
    const response = await axios.post('/api/auth/logIn', {
      username: credentials.username,
      password: credentials.password,
    })
    return [response, undefined]
  } catch (e) {
    return [undefined, e]
  }
}
