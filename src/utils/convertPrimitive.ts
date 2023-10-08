export function convertPrimitive(key: string, value: unknown): string {
  const keys = key.split('_')
  const convertedKey = keys.length > 1
    ? keys[0] + keys[1].charAt(0).toUpperCase() + keys[1].slice(1)
    : keys[0]
  return `  @Expose({ name: '${key}' })
  public ${convertedKey}: ${typeof value}`
}