import { startServer } from './startServer'
import { runTests } from './tests/runTests'

export async function start(){
  await runTests()
  // startServer()
}