export const serialize = (input: any) => {
  return JSON.parse(
    JSON.stringify(input, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    ),
  )
}
