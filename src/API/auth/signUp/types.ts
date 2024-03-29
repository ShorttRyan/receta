export type SignupCredentials = {
  email: string
  username: string
  password: string
  firstName: string
  lastName: string
}

export type SignupSuccess = {
  message: string
}
export type SignupFailure = {
  prismaCode: string
  field: keyof SignupCredentials
  message: string
}
export function isSignUpPrismaFailure(failure: any): failure is SignupFailure {
  return (failure as SignupFailure).prismaCode !== undefined
}
