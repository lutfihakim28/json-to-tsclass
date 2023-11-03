export function snakeToPascal(value: string) {
  const keys = value.split('_')
  const convertedKey = keys.map((key) => {
    return key.charAt(0).toUpperCase() + key.slice(1)
  }).join('')
  return convertedKey
}