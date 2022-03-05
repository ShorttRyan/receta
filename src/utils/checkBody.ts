export const checkBody = (body: any, requiredFields: string[]) => {
  return requiredFields.find((field) => {
    if (body?.[field] === undefined) {
      return field
    }
  })
}
