import axios from 'axios'
import { LogOutResponse } from './types'

export * from './types'

export type LogOutPost = () => Promise<[LogOutResponse?, any?]>
export const logOut: LogOutPost = async () => {
  try {
    const response = await axios.post('/api/auth/logOut')
    return [response, undefined]
  } catch (e) {
    return [undefined, e]
  }
}
