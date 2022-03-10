import axios, { AxiosResponse } from 'axios'
import { SignupCredentials, SignupSuccess } from './types'

export * from './types'

export type SignUpPost = (
  credentials: SignupCredentials,
) => Promise<[AxiosResponse<SignupSuccess>?, any?]>

export const signUp: SignUpPost = async (credentials) => {
  try {
    const response = await axios.post('/api/auth/signUp', {
      email: credentials.email,
      username: credentials.username,
      password: credentials.password,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
    })
    return [response, undefined]
  } catch (e) {
    return [undefined, e]
  }
}
