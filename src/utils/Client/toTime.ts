export const toTime = (ttc: number) => {
  const mins = ttc % 60
  return `${Math.floor(ttc / 60)}:${
    mins % 60 === 0 ? '00' : mins % 60 === 5 ? '05' : mins
  }`
}
