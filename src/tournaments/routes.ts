import { Router } from 'express'
import { json } from 'body-parser'
import {
  getTournament,
  getTournaments,
  createTournament,
  updateTounament,
  deleteTournament,
} from './controllers'

export const tournamentRoutes = Router()

const parser = json()

tournamentRoutes.get('/:id', parser, getTournament)
tournamentRoutes.get('/', parser, getTournaments)
tournamentRoutes.post('/', parser, createTournament)
tournamentRoutes.put('/:id', parser, updateTounament)
tournamentRoutes.delete('/:id', parser, deleteTournament)
