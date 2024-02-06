import express from 'express'
// @ts-expect-error ???
import ViteExpress from 'vite-express'

export function startServer(){
  const app = express()
  ViteExpress.listen(app, 3000, () =>
    console.log('Server is listening on port 3000...')
  )
}
