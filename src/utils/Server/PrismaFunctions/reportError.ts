import { Prisma } from '@prisma/client'
import { logPrismaError } from '../logging'
import { NextApiResponse } from 'next'

export const reportError = (
  e: any,
  errorMessage: string,
  loggingLocation: string,
  res: NextApiResponse,
) => {
  const errorResponse: {
    message: string
    prismaError?: Prisma.PrismaClientKnownRequestError
  } = {
    message: errorMessage,
  }
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    logPrismaError(e, loggingLocation)
    errorResponse.prismaError = e
  }
  res.json(errorResponse)
}
