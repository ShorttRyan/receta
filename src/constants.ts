import {CookieSerializeOptions} from 'cookie'

export const cookieOptions: CookieSerializeOptions = {
  httpOnly: true,
  maxAge: 2592000,
  path: '/',
  sameSite: 'strict',
  secure: ['production', 'staging', 'preview', 'development'].includes(process.env.NODE_ENV),
}
