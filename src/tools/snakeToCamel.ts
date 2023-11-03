export function snakeToCamel(value: string) {
  const keys = value.split('_')
  const convertedKey = keys.map((key, index) => {
    if (index === 0) return key
    return key.charAt(0).toUpperCase() + key.slice(1)
  }).join('')
  return convertedKey
}