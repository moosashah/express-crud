import * as express from 'express'
import { Request, Response } from 'express'


import { tournamentRoutes } from './tournaments/routes'

// Constants
const PORT = 4200
const HOST = '0.0.0.0'

// App handlers
const app = express()

app.get('/ping', (_req: Request, res: Response) => {
  res.status(200).send('pong')
})

app.use('/tournament', tournamentRoutes)

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
