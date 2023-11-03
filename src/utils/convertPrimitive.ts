import { snakeToCamel } from '@/tools/snakeToCamel'

export function convertPrimitive(key: string, value: unknown): string {
  const convertedKey = snakeToCamel(key)
  return `  @Expose({ name: '${key}' })
  public ${convertedKey}: ${value !== null ? typeof value : 'any'}`
}