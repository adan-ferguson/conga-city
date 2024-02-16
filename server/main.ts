import { startServer } from './startServer'
import { runTests } from './tests/runTests'

export async function start(){
  if(await runTests()){
    startServer()
  }else{
    console.log('Tests failed, server not started.')
  }
}