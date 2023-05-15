export * from './emitter'

export interface EventsMap {
  [id: string]: unknown
}

export interface Emitter<Events extends EventsMap> {
  /**
   * Main events map.
   *
   * Stores all registered events.
   *
   * @example
   *
   * ```ts
   * emitter.events
   * ```
   */
  events: Map<keyof Events, Array<(event: any) => void>>
  /**
   * Registers a specific event.
   *
   * @example
   *
   * ```ts
   * emitter.on('event-id', e => console.log(e.x, e.y))
   * ```
   */
  on<K extends keyof Events>(id: K, callback: (event: Events[K]) => void): void
  /**
   * Emits a specific event.
   *
   * @example
   *
   * ```ts
   * emitter.emit('event-id', { x: 0, y: 0 })
   * ```
   */
  emit<K extends keyof Events>(id: K, event: Events[K]): void
}
