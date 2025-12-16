import type {
  EventsMap,
  EventCallback,
  OptionsID,
  EventOptions,
  EventDetails,
  Emitter,
} from './types'

/**
 * Creates an event emitter.
 *
 * @example
 *
 * ```ts
 * import { createEmitter } from '@hypernym/emitter'
 *
 * type Events = {
 *   'event-id': { x: number; y: number }
 *   // ...
 * }
 *
 * const emitter = createEmitter<Events>()
 *
 * emitter.on('event-id', e => console.log(e.x, e.y))
 *
 * emitter.emit('event-id', { x: 0, y: 0 })
 * ```
 *
 * @see [Repository](https://github.com/hypernym-studio/emitter)
 */
export function createEmitter<
  Events extends EventsMap = EventsMap,
>(): Emitter<Events> {
  const events = new Map<
    keyof Events,
    Map<EventCallback<keyof Events, Events>, EventDetails<keyof Events, Events>>
  >()

  return {
    events,
    on<Key extends keyof Events, Options extends EventOptions = EventOptions>(
      id: Key,
      callback: EventCallback<Key, Events>,
      options?: EventOptions<Options>,
    ): () => void {
      let map = events.get(id)
      if (!map) {
        map = new Map()
        events.set(id, map)
      }
      map.set(
        callback as EventCallback<keyof Events, Events>,
        {
          id,
          callback,
          options,
        } as EventDetails<keyof Events, Events>,
      )
      return () => this.off(id, callback)
    },
    off<Key extends keyof Events>(
      id?: Key,
      callback?: EventCallback<Key, Events>,
    ): void {
      if (!id) return events.clear()
      const map = events.get(id)
      if (!map) return
      if (!callback) {
        events.delete(id)
        return
      }
      map.delete(callback as EventCallback<keyof Events, Events>)
      if (!map.size) events.delete(id)
    },
    get<Key extends keyof Events, Options extends EventOptions = EventOptions>(
      id: Key,
      optionsId: OptionsID,
    ): EventDetails<keyof Events, Events, Options> | undefined {
      const map = events.get(id)
      if (!map) return
      for (const details of [...map.values()]) {
        if (details.options?.id === optionsId) {
          return details as
            | EventDetails<keyof Events, Events, Options>
            | undefined
        }
      }
    },
    emit<Key extends keyof Events>(id: Key, event: Events[Key]): void {
      const map = events.get(id)
      if (!map) return
      if (typeof event === 'function') {
        for (const details of [...map.values()]) event(details)
        return
      }
      for (const { callback } of [...map.values()]) callback(event)
    },
  }
}
