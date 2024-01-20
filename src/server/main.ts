import express from 'express'
import ViteExpress from 'vite-express'
import type { LobbyFizzetch } from '../shared/types'

const app = express()

app.post('/lobby', (_, res) => {
  const ret: LobbyFizzetch = {
    list: ['a']
  }
  res.send(ret)
})

app.post('/match/:id', (_, res) => {
  // ?
})


ViteExpress.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
)
