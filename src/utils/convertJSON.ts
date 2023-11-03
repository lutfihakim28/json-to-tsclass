import { snakeToPascal } from '@/tools/snakeToPascal'
import { convertArray } from './convertArray'
import { convertObject } from './convertObject'
import { convertPrimitive } from './convertPrimitive'

let classes: string[] = []

export function resetClasses() {
  classes = []
}

export function convertJSON(value: Record<string, unknown>, key?: string) {
  const nestedData: Record<string, unknown>[] = []
  const nestedDataKey: string[] = []
  let keys: string[]
  let convertedKey: string = ''
  if (key) {
    keys = key.split('_')
    convertedKey = keys.map((key) => {
      return key.charAt(0).toUpperCase() + key.slice(1)
    }).join('')
  }
  const results = [`\nexport class ${key ? convertedKey : 'Data'} {`]
  let isNested = false
  Object.keys(value).forEach((key, index) => {
    if (typeof value[key] === 'object' && value[key] !== null && !(value[key] instanceof Array)) {
      results.push(`${convertObject(key)}${index === Object.keys(value).length - 1 ? '' : '\n'}`)
      nestedData.push(value[key] as Record<string, unknown>)
      nestedDataKey.push(key)
      isNested = isNested || true
    } else if (value[key] instanceof Array) {
      if ((value[key] as Array<unknown>)[0] === Object((value[key] as Array<unknown>)[0])) {
        results.push(`${convertObject(key, true)}${index === Object.keys(value).length - 1 ? '' : '\n'}`)
        nestedData.push((value[key] as Record<string, unknown>[])[0])
        nestedDataKey.push(key)
        isNested = isNested || true
      } else {
        results.push(`${convertArray(key, value[key])}${index === Object.keys(value).length - 1 ? '' : '\n'}`)
        isNested = isNested || false
      }
    } else {
      results.push(`${convertPrimitive(key, value[key])}${index === Object.keys(value).length - 1 ? '' : '\n'}`)
      isNested = isNested || false
    }
  })
  if (isNested) {
    const keys = [...nestedDataKey]
    keys.sort()
    keys.forEach((key) => {
      results.unshift(`import { ${snakeToPascal(key)} } from './${snakeToPascal(key)}'`)
    })
    results.unshift(`import { Expose, Type } from 'class-transformer'`)
  } else {
    results.unshift("import { Expose } from 'class-transformer'")
  }
  classes.push([...results, '}'].join('\n'))
  if (nestedData.length > 0) {
    nestedData.forEach((data, index) => {
      convertJSON(data, nestedDataKey[index])
    })
  }


  return classes
}