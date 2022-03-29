export const toDate = (dateStr: string) => {
  const dateNum = parseInt(dateStr)
  const newDate = new Date(dateNum)
  return `${newDate.getUTCDate()}-${
    newDate.getUTCMonth() + 1
  }-${newDate.getUTCFullYear()}`
}
