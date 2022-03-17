import { NextApiResponse } from 'next'

export const checkBody = (
  body: any,
  requiredFields: string[],
  res: NextApiResponse,
) => {
  let bodyPassed = true
  let responseMessage = `Missing field(s) in body:`
  requiredFields.forEach((field) => {
    if (body?.[field] === undefined) {
      responseMessage += `${bodyPassed ? '' : ','} ${field}`
      bodyPassed = false
    }
  })
  if (!bodyPassed) {
    res.status(400).json({
      message: responseMessage + '.',
    })
  }
  return bodyPassed
}
