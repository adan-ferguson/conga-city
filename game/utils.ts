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

export function toDisplayName(key: string): string{
  return key.substring(0, 1).toUpperCase() + key.substring(1)
}

export function padArray<T>(arr: T[], length: number): (T|undefined)[]{
  const newArr: (T|undefined)[] = []
  for(let i = 0; i < length; i++){
    newArr[i] = arr[i]
  }
  return newArr
}

export function wait(ms: number){
  return new Promise(res => {
    setTimeout(res, ms)
  })
}