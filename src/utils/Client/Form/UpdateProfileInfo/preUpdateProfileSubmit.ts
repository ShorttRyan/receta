import { FormFunction } from '../types'
import { email } from '../../../regex'
import { UpdateProfileForm } from '../../../../components/ProfileOverview/type'
import { checkRequired } from '../checkRequired'

export const preUpdateProfileSubmit: FormFunction<
  UpdateProfileForm,
  boolean
> = (profile, setProfile) => {
  // @ts-ignore
  let [newProfile, status] = checkRequired(profile)
  if (profile.email.value.length > 0 && !email.test(profile.email.value)) {
    status = false
    newProfile.email.error = true
    newProfile.email.message = 'Please enter a valid email address'
  }
  // @ts-ignore
  setProfile(newProfile)
  return status
}
