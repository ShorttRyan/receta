import {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log(req.cookies)
    res.json({message: 'Successfully logged out'})
  } else {
    res.status(405).json({
      message: `Method not allowed`,
    })
  }
}
