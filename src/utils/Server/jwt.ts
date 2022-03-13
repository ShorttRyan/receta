import jwt from 'jsonwebtoken'
import { NextApiResponse } from 'next'

export interface DecodedToken extends AccessTokenBody {
  iat: number
  exp: number
}

export interface AccessTokenBody {
  username: string
  email: string
  firstName: string
  lastName: string
  id: number
}

export const generateAccessToken = (body: AccessTokenBody): string => {
  return jwt.sign(body, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: process.env.TOKEN_TTL,
  })
}

export const validateAccessToken = (
  token: string,
  res?: NextApiResponse,
): [DecodedToken?, any?] => {
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
    ) as DecodedToken
    return [decodedToken, undefined]
  } catch (e) {
    if (res) {
      res.status(404).json({ message: 'Missing token.' })
      res.end()
    }
    return [undefined, e]
  }
}
