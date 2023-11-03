import { snakeToCamel } from '@/tools/snakeToCamel';

export function convertArray(key: string, value: unknown): string {
  const convertedKey = snakeToCamel(key)
  const isTupple = (value as unknown[]).length !== 0 && new Set((value as unknown[]).map((el) => typeof el)).size !== 1;
  let types: string
  if (isTupple) {
    types = JSON
      .stringify((value as unknown[]).map((el) => el !== null ? typeof el : 'any'))
      .replaceAll('"', '')
      .replaceAll(',', ', ')
  } else {
    types = `${typeof ((value as unknown[])[0])}[]`
  }
  return `  @Expose({ name: '${key}' })
  public ${convertedKey}: ${types}`
}