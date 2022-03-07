import {NextApiRequest, NextApiResponse} from 'next'
import {logJwtError, validateAccessToken} from '../../../utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log(req.cookies)
    const [accessToken, error] = validateAccessToken(req.cookies.auth)
    if (accessToken === undefined) {
      logJwtError(error, '/auth/test')
      res.status(401).json(error)
      return
    }
    res.json({message: 'Successfully logged out'})
  } else {
    res.status(405).json({
      message: `Method not allowed`,
    })
  }
}
