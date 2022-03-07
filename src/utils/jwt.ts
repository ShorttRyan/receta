import jwt from 'jsonwebtoken'

export interface DecodedToken extends AccessTokenBody {
  iat: number
  exp: number
}

export interface AccessTokenBody {
  username: string
}

export const generateAccessToken = (body: AccessTokenBody): string => {
  return jwt.sign(
    body,
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: '30s',
    }
  )
}

export const validateAccessToken = (token: string): [DecodedToken?, any?] => {
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as DecodedToken
    return [decodedToken, undefined]
  } catch (e) {
    return [undefined, e]
  }
}
