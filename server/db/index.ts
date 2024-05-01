import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location } from '../../models/Location.ts'
import type { Event, EventWithLocation, EventData } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

export async function getAllLocations() {
  const locations: unknown[] = await connection('locations').select()
  return locations as Location[]
}

export async function getEventsByDay(day: string) {
  const events: unknown[] = await connection('events')
    .join('locations', 'events.location_id', 'locations.id')
    .where('events.day', day)
    .select(
      'locations.name as locationName',
      'locations.description as locationDescription',
      'locations.id as locationId',
      'events.id as eventId',
      'events.name as eventName',
      'events.description as eventDescription',
      'events.time',
    )
  return events as Event[]
}

export async function getLocationById(id: string) {
  const location: unknown[] = await connection('locations')
    .where('locations.id', id)
    .first()

  return location as Location[]
}

export async function updateLocation(
  id: number,
  name: string,
  description: string,
) {
  const location: unknown[] = await connection('locations')
    .where('locations.id', id)
    .update({
      name: name,
      description: description,
    })
  return location as Location[]
}

export async function createEvent(event: EventData) {
  const [addedEventId] = await connection('events')
    .insert({
      location_id: event.locationId,
      day: event.day,
      time: event.time,
      name: event.name,
      description: event.description,
    })
    .returning('id')
  return addedEventId
}

export async function deleteEvent(id: number) {
  return await connection('events').where({ id }).delete()
}

export async function getEventById(id: number) {
  const event: unknown = connection('events')
    .join('locations', 'locations.id', 'events.location_id')
    .where('events.id', id)
    .first()
    .select(
      'events.id',
      'locations.name as locationName',
      'events.name',
      'events.description',
      'events.time',
      'events.day',
    )
  return event as EventWithLocation[]
  //where can i console.log to see what data looks like?
  // const eventWithLocation: EventWithLocation = {
  //   id: event.id,
  //   locationName: event.locationName,
  //   eventName: event.eventName,
  //   description: event.description,
  //   time: event.time,
  //   day: event.day,
  // };

  // return eventWithLocation;
}
