require('dotenv').config()

import * as express from 'express'
import { Request, Response } from 'express'
import { tournamentRoutes } from './tournaments/routes'

const app = express()

app.get('/ping', (_req: Request, res: Response) => {
  res.status(200).send('pong')
})

app.use('/tournament', tournamentRoutes)

export default app
