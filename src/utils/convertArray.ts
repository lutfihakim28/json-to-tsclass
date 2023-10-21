export function convertArray(key: string, value: unknown): string {
  const keys = key.split('_')
  const convertedKey = keys.map((key, index) => {
    if (index === 0) return key
    return key.charAt(0).toUpperCase() + key.slice(1)
  }).join('')
  const isTupple = (value as unknown[]).length !== 0 && new Set(value as unknown[]).size !== 1;
  let types: string
  if (isTupple) {
    types = JSON
      .stringify((value as unknown[]).map((el) => el !== null ? typeof el : 'any'))
      .replaceAll('"', '')
      .replaceAll(',', ', ')
  } else {
    types = `${typeof (value as unknown[])[0]}[]`
  }
  return `  @Expose({ name: '${key}' })
  public ${convertedKey}: ${types}`
}