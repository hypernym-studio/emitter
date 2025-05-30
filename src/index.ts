import type { EventsMap, Emitter } from './types'

/**
 * Creates an event emitter.
 *
 * @example
 *
 * ```ts
 * import { createEmitter, type Emitter } from '@hypernym/emitter'
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
  const events = new Map<
    keyof Events,
    ((event: Events[keyof Events]) => void)[]
  >()

  return {
    events,
    on<K extends keyof Events>(
      id: K,
      callback: (event: Events[K]) => void,
    ): () => void {
      if (events.has(id)) events.get(id)?.push(callback as any)
      else events.set(id, [callback as any])
      return () => this.off(id, callback)
    },
    off<K extends keyof Events>(
      id?: K,
      callback?: (event: Events[K]) => void,
    ): void {
      if (!id) {
        events.clear()
        return
      }
      if (!callback) {
        events.delete(id)
        return
      }
      const filtered = events.get(id)?.filter((cb) => cb !== callback)
      if (filtered?.length) events.set(id, filtered)
      else events.delete(id)
    },
    emit<K extends keyof Events>(id: K, event: Events[K]): void {
      events
        .get(id)
        ?.slice()
        .forEach((cb) => cb(event))
    },
  }
}
