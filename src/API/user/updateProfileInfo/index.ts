import axios, { AxiosResponse } from 'axios'
import { UpdateProfileBody, UpdateProfileSuccess } from './types'

export * from './types'

export type UpdateProfileInfo = (
  credentials: UpdateProfileBody,
) => Promise<[AxiosResponse<UpdateProfileSuccess>?, any?]>

export const updateProfileInfo: UpdateProfileInfo = async (newProfile) => {
  try {
    const response = await axios.put('/api/user/updateProfileInfo', {
      firstName: newProfile.firstName,
      lastName: newProfile.lastName,
      email: newProfile.email,
    })
    return [response, undefined]
  } catch (e) {
    return [undefined, e]
  }
}
