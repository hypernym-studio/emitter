import type { EventsMap, Emitter } from './types'

/**
 * Creates an event emitter.
 *
 * @example
 *
 * ```ts
 * import { createEmitter, Emitter } from '@hypernym/emitter'
 *
 * type Events = {
 *   'event-id': { x: number; y: number }
 *   // ...
 * }
 *
 * const emitter: Emitter<Events> = createEmitter<Events>()
 *
 * emitter.on('event-id', e => console.log(e.x, e.y))
 *
 * emitter.emit('event-id', { x: 0, y: 0 })
 * ```
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
