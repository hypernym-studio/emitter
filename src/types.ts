export interface EventsMap {
  [id: string | symbol]: unknown
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
  events: Map<keyof Events, ((event: Events[keyof Events]) => void)[]>
  /**
   * Registers an event listener for a specific event type.
   *
   * Returns a cleanup function that removes the listener when called.
   *
   * @example
   *
   * ```ts
   * // Adds click listener
   * const unsubscribe = emitter.on('scroll', ({ x, y }) => {
   *   console.log(x, y)
   * })
   * // Removes the listener
   * unsubscribe()
   * ```
   */
  on<K extends keyof Events>(
    id: K,
    callback: (event: Events[K]) => void,
  ): () => void
  /**
   * Removes event listeners.
   *
   * @example
   *
   * ```ts
   * // Removes all event listeners across all event types
   * emitter.off()
   * // Removes all click listeners
   * emitter.off('click')
   * // Removes specific scroll callback
   * emitter.off('scroll', scrollCallback)
   * ```
   */
  off<K extends keyof Events>(
    id?: K,
    callback?: (event: Events[K]) => void,
  ): void
  /**
   * Emits a specific event.
   *
   * @example
   *
   * ```ts
   * // Emits scroll event with position data
   * emitter.emit('scroll', { x: window.scrollX, y: window.scrollY })
   * // Emits event without second parameter
   * emitter.emit('eventWithoutData')
   * ```
   */
  emit<K extends keyof Events>(
    id: K,
    ...event: Events[K] extends undefined
      ? [event?: Events[K]]
      : [event: Events[K]]
  ): void
}

export * from '@'
