import type { EventsMap, Emitter } from './types'

/**
 * Creates an event emitter.
 */
export function createEmitter<Events extends EventsMap>(): Emitter<Events> {
  const events = new Map<keyof Events, Array<(event: any) => void>>()

  return {
    events,

    on<K extends keyof Events>(
      id: K,
      callback: (event: Events[K]) => void
    ): void {
      if (events.has(id)) events.get(id)?.push(callback)
      else events.set(id, [callback])
    },

    emit<K extends keyof Events>(id: K, event: Events[K]): void {
      events.get(id)?.forEach(callback => callback(event))
    }
  }
}
