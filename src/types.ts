export interface EventsMap {
  [id: string]: unknown
}

export interface Emitter<Events extends EventsMap> {
  events: Map<keyof Events, Array<(event: any) => void>>
  on<K extends keyof Events>(id: K, callback: (event: Events[K]) => void): void
  emit<K extends keyof Events>(id: K, event: Events[K]): void
}
