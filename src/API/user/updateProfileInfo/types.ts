export interface UpdateProfileBody {
  firstName: string
  lastName: string
  email: string
}

export type UpdateProfileSuccess = {
  message: string
}
export type UpdateProfileFailure = {
  prismaCode: string
  field: keyof UpdateProfileBody
  message: string
}
export function isPrismaFailure(failure: any): failure is UpdateProfileFailure {
  return (failure as UpdateProfileFailure).prismaCode !== undefined
}
