import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
import { cookieOptions } from '../../../constants'

// noinspection JSUnusedGlobalSymbols
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', serialize('auth', String(''), cookieOptions))
    res.json({ message: 'Logged out successfully.' })
  } else {
    res.status(405).json({
      message: `Method not allowed`,
    })
  }
}
