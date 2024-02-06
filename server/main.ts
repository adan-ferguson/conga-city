import { startServer } from './startServer'
import { runTests } from './tests/runTests';

(async() => {
  await runTests()
  startServer()
})()