import { ref } from 'vue'
import { convertArray } from './convertArray'
import { convertObject } from './convertObject'
import { convertPrimitive } from './convertPrimitive'

export function convertJSON() {
  const classes = ref<string[]>([])
  let nestedData: Record<string, unknown> | undefined
  let nestedDataKey: string | undefined
  
  function converter(value: Record<string, unknown>, key?: string) {
    let keys: string[]
    let convertedKey: string = ''
    if (key) {
      keys = key.split('_')
      convertedKey = keys.length > 1
        ? keys[0].charAt(0).toUpperCase() + keys[0].slice(1) + keys[1].charAt(0).toUpperCase() + keys[1].slice(1)
        : keys[0].charAt(0).toUpperCase() + keys[0].slice(1)
    }
    const results = [`export class ${key ? convertedKey : 'Data'} {`]
    let isNested = false
    Object.keys(value).forEach((key, index) => {
      if (typeof value[key] === 'object' && !(value[key] instanceof Array)) {
        results.push(`${convertObject(key)}${index === Object.keys(value).length - 1 ? '' : '\n'}`)
        nestedData = value[key] as Record<string, unknown>
        nestedDataKey = key
        isNested = true
      } else if (value[key] instanceof Array) {
        if ((value[key] as Array<unknown>)[0] === Object((value[key] as Array<unknown>)[0])) {
          results.push(`${convertObject(key, true)}${index === Object.keys(value).length - 1 ? '' : '\n'}`)
          nestedData = (value[key] as Record<string, unknown>[])[0]
          nestedDataKey = key
          isNested = true
        } else {
          results.push(`${convertArray(key, value[key])}${index === Object.keys(value).length - 1 ? '' : '\n'}`)
          nestedData = undefined
          nestedDataKey = undefined
          isNested = false
        }
      } else {
        results.push(`${convertPrimitive(key, value[key])}${index === Object.keys(value).length - 1 ? '' : '\n'}`)
        nestedData = undefined
        nestedDataKey = undefined
        isNested = false
      }
    })
    if (isNested) {
      results.unshift("import { Expose, Type } from 'class-transformer'\n")
    } else {
      results.unshift("import { Expose } from 'class-transformer'\n")
    }
    classes.value.push([...results, '}'].join('\n'))
    if (nestedData !== undefined) {
      converter(nestedData, nestedDataKey)
    } 
  }
  return {
    classes,
    converter
  }
}