export function convertObject(key: string, isArray?: boolean): string {
  const keys = key.split('_')
  const convertedKey = keys.map((key, index) => {
    if (index === 0) return key
    return key.charAt(0).toUpperCase() + key.slice(1)
  }).join('')
  const className = keys.map((key) => {
    return key.charAt(0).toUpperCase() + key.slice(1)
  }).join('')
  return `  @Expose({ name: '${key}' })
  @Type(() => ${className})
  public ${convertedKey}: ${isArray ? className + '[]' : className}`
}