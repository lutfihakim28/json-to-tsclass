export function convertPrimitive(key: string, value: unknown): string {
  const keys = key.split('_')
  const convertedKey = keys.map((key, index) => {
    if (index === 0) return key
    return key.charAt(0).toUpperCase() + key.slice(1)
  }).join('')
  return `  @Expose({ name: '${key}' })
  public ${convertedKey}: ${value ? typeof value : 'any'}`
}