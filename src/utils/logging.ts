import {Prisma} from '@prisma/client'

export const logPrismaError = (error: Prisma.PrismaClientKnownRequestError, location: string) => {
  console.log(
    '#################### Prisma Error ####################',
    `\nlocation: ${location}\ncode: ${error.code}`,
    error.message,
    '######################################################'
  )
}

export const logJwtError = (error: any, location: string) => {
  console.log(
    '###################### JWT error #####################',
    `\nlocation: ${location}\nname: ${error.name}\nmesage: ${error.message}`,
    '\n####################################################'
  )
}
