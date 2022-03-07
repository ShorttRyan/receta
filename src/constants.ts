import {CookieSerializeOptions} from 'cookie'

export const cookieOptions: CookieSerializeOptions = {
  httpOnly: true,
  maxAge: 2592000,
  path: '/',
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
}
