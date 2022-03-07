import { Prisma } from '@prisma/client'

export const logPrismaError = (
  error: Prisma.PrismaClientKnownRequestError,
  location: string,
) => {
  console.log('###################### Prisma error #####################')
  console.log('location:', location)
  console.log('meta:', { ...error })
  console.log(error.message)
  console.log('######################################################')
}

export const logJwtError = (error: any, location: string) => {
  console.log('###################### JWT error #####################')
  console.log('location:', location)
  console.log('name:', error.name)
  console.log('message:', error.message)
  console.log('######################################################')
}
