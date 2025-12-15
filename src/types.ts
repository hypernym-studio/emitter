export type EventsMap = {
  [Key in string | symbol]: unknown
}

export type OptionsID = string | number | symbol

export type EventOptions<
  Options extends object = Record<string | symbol, unknown>,
> = {
  id?: OptionsID
  once?: boolean
} & Options

export type EventCallback<
  Key extends keyof Events,
  Events extends EventsMap,
> = undefined extends Events[Key]
  ? (event?: Events[Key]) => void
  : (event: Events[Key]) => void

export type EventDetails<
  Key extends keyof Events,
  Events extends EventsMap,
  Options extends EventOptions = EventOptions,
> = {
  id: Key
  callback: EventCallback<Key, Events>
  options?: EventOptions<Options>
}

export interface Emitter<Events extends EventsMap> {
  events: Map<
    keyof Events,
    Map<EventCallback<keyof Events, Events>, EventDetails<keyof Events, Events>>
  >
  on<Key extends keyof Events, Options extends EventOptions = EventOptions>(
    id: Key,
    callback: EventCallback<Key, Events>,
    options?: EventOptions<Options>,
  ): () => void
  off<Key extends keyof Events>(
    id?: Key,
    callback?: EventCallback<Key, Events>,
  ): void
  get<Key extends keyof Events, Options extends EventOptions = EventOptions>(
    id: Key,
    optionsId: OptionsID,
  ): EventDetails<keyof Events, Events, Options> | undefined
  emit<Key extends keyof Events, Options extends EventOptions = EventOptions>(
    id: Key,
    ...event: undefined extends Events[Key]
      ? [
          event?:
            | Events[Key]
            | ((details: EventDetails<Key, Events, Options>) => void),
        ]
      : [
          event:
            | Events[Key]
            | ((details: EventDetails<Key, Events, Options>) => void),
        ]
  ): void
}

export * from '@'
