import { CookieSerializeOptions } from 'cookie'
import { DecodedToken } from './utils/Server'

export const cookieOptions: CookieSerializeOptions = {
  httpOnly: true,
  maxAge: 2592000,
  path: '/',
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
}

export const guestToken: DecodedToken = {
  username: 'guest',
  email: 'guest',
  firstName: 'guest',
  lastName: 'guest',
  id: -1,
  iat: 10000000,
  exp: 10000000,
}
