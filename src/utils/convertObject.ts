import { snakeToCamel } from '@/tools/snakeToCamel'
import { snakeToPascal } from '@/tools/snakeToPascal'

export function convertObject(key: string, isArray?: boolean): string {
  const convertedKey = snakeToCamel(key)
  const className = snakeToPascal(key)
  return `  @Expose({ name: '${key}' })
  @Type(() => ${className})
  public ${convertedKey}: ${isArray ? className + '[]' : className}`
}