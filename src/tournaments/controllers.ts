import { Request, Response } from 'express'
import { NewTournament, tournaments } from './schemas'
import { eq } from 'drizzle-orm/expressions'
import { db } from '../../drizzle/postgres'

interface TypedBody<T> extends Request {
  body: T
}

export const getTournament = async (req: Request, res: Response) => {
  const { id } = req.params
  if (id) {
    const tournament = await db.select().from(tournaments).where(eq(tournaments.id, id))
    if (tournament.length === 0) return res.status(404).json({ message: `Tournament of id: ${id} not found`, code: 404 })
    return res.status(200).json(tournament)
  }
  console.log('no id')
  return res.status(400).json('No tournamentId provided')
}

export const getTournaments = async (_req: Request, res: Response) => {
  const allTournaments = await db.select().from(tournaments)
  return res.status(200).send(allTournaments)
}

export const createTournament = async (req: TypedBody<NewTournament>, res: Response) => {
  const { name, address_post_code, address_city, address_line_one, address_line_two } = req.body
  const newTournament: NewTournament = {
    name,
    address_city,
    address_line_one,
    address_line_two,
    address_post_code,
  }

  const insertTournament = await db.insert(tournaments).values(newTournament).returning()
  const [newInsert] = insertTournament

  return res.status(201).send(newInsert)
}

export const updateTounament = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, address_post_code, address_city, address_line_one, address_line_two } = req.body
  try {
    const updatedTournament = await db.update(tournaments)
      .set({ address_line_one, address_line_two: address_line_two ? address_line_two : null, name, address_city, address_post_code, updatedAt: new Date() })
      .where(eq(tournaments.id, id))
      .returning()
    if (updatedTournament.length === 0) return res.status(404).json({ message: `Tournament of id: ${id} not found`, code: 404 })
    return res.status(200).send(updatedTournament)
  } catch (e) {
    console.log('im erroring in the update')
    return res.status(400).send(e)
  }
}

export const deleteTournament = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deletedTournament = await db.delete(tournaments).where(eq(tournaments.id, id)).returning()
    if (deletedTournament.length === 0) return res.status(404).json({ message: `Tournament of id: ${id} not found`, code: 404 })
    return res.status(204).send()
  } catch (e) {
    console.log('im erroring in the delete')
    return res.status(400).send(e)
  }
}
