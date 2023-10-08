export function convertArray(key: string, value: unknown): string {
  const keys = key.split('_')
  const convertedKey = keys.length > 1
    ? keys[0] + keys[1].charAt(0).toUpperCase() + keys[1].slice(1)
    : keys[0]
  let elementType: string | undefined
  (value as unknown[]).forEach((el) => {
    const type = typeof el
    if (!elementType) {
      elementType = type
    } else if (elementType !== type) {
      elementType = 'any'
    }
  })
  return `  @Expose({ name: '${key}' })
  public ${convertedKey}: ${elementType}[]`
}