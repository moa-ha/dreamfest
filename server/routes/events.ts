import express from 'express'

import { validateDay } from './helpers.ts'

import * as db from '../db/index.ts'

const router = express.Router()
export default router

router.post('/', async (req, res, next) => {
  try {
    const { name, description, time, locationId } = req.body
    const day = validateDay(req.body.day)
    // const id = 0

    const id = await db.createEvent({
      locationId,
      day,
      time,
      name,
      description,
    })
    //couldn't make the url "/${id}". still doesn't work after returning id by .returning('id') in index.ts file
    const url = `/api/v1/events/${id}`
    res.setHeader('Location', url)
    res.status(201).json({ location: url })
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    await db.deleteEvent(id)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  // it doesn't return location but others are okay

  try {
    const event = await db.getEventById(Number(id))
    if (!event) {
      res.sendStatus(404)
    } else {
      res.json(event)
    }
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { name, description, time } = req.body
    const id = Number(req.body.id)
    const day = validateDay(req.body.day)
    const locationId = Number(req.body.locationId)

    // TODO: UPDATE the event in the db with the matching ID using these details,
    // if no event has a matching id, respond with a 404 instead
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})
