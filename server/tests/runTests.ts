import { readdir, lstat } from 'fs/promises'
import * as url from 'url'
import path from 'path'
import { TizzestError } from './utils'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
let passes: number
let fails : number

export async function runTests(){
  passes = 0
  fails = 0
  await runTestsInDir(__dirname)
  console.log(`Tests: ${passes}-${fails}`)
}

async function runTestsInDir(dir: string, chain: string[] = []){
  const files = await readdir(dir)
  for(const file of files){
    const fullPath = path.join(dir, file)
    const isDir = (await lstat(fullPath)).isDirectory()
    if(isDir){
      await runTestsInDir(fullPath, [...chain, file])
    }else if(chain.length > 0 && path.extname(file) === '.js'){
      const js = await import('./' + path.join(...chain, file))
      for(const [ string, fn ] of Object.entries(js.default)){
        if(typeof fn === 'function'){
          await runTest(string, fn) ? passes++ : fails++
        }
      }
    }
  }
}

async function runTest(key: string, fn: CallableFunction){
  try {
    fn()
    return true
  }catch(err){
    if(err instanceof TizzestError){
      console.log('Test failed: ', key, err.message)
    }else{
      throw err
    }
    return false
  }
}