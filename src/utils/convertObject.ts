export function convertObject(key: string, isArray?: boolean): string {
  const keys = key.split('_')
  const convertedKey = keys.length > 1
    ? keys[0] + keys[1].charAt(0).toUpperCase() + keys[1].slice(1)
    : keys[0]
  const className = keys.length > 1
    ? keys[0].charAt(0).toUpperCase() + keys[0].slice(1) + keys[1].charAt(0).toUpperCase() + keys[1].slice(1)
    : keys[0].charAt(0).toUpperCase() + keys[0].slice(1)
  return `  @Expose({ name: '${key}' })
  @Type(() => ${className})
  public ${convertedKey}: ${isArray ? className + '[]' : className}`
}