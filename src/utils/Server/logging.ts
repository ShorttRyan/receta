import { DecodedToken } from './jwt'

export const logPrismaError = (error: any, location: string) => {
  console.log('###################### Prisma error #####################')
  console.log('location:', location)
  console.log('meta:', { ...error })
  console.log(error.message)
  console.log('#########################################################')
}

export const logJwtError = (error: any, location: string) => {
  console.log('######################## JWT error ######################')
  console.log('location:', location)
  console.log('name:', error.name)
  console.log('message:', error.message)
  console.log('#########################################################')
}

export const logPageError = (
  error: any,
  location: string,
  token: DecodedToken,
) => {
  console.log('####################### PAGE error ######################')
  console.log('location:', location)
  console.log('user token:', token)
  console.log('error:', error)
  console.log('#########################################################')
}
