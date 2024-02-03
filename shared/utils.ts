import { v4 } from 'uuid'

export function deepClone<T>(obj: T): T{
  return JSON.parse(JSON.stringify(obj))
}

export function fillArray<T>(length: number, cb: () => T){
  return new Array(length).fill(1).map(cb)
}

export function uniqueID(): string{
  return v4()
}