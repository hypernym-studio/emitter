<h1 align="center">@hypernym/emitter</h1>

<p align="center">A super simple and lightweight event emitter.</p>

<p align="center">
  <a href="https://github.com/hypernym-studio/emitter">Repository</a>
  <span>✦</span>
  <a href="https://www.npmjs.com/package/@hypernym/emitter">Package</a>
  <span>✦</span>
  <a href="https://github.com/hypernym-studio/emitter/releases">Releases</a>
  <span>✦</span>
  <a href="https://github.com/hypernym-studio/emitter/discussions">Discussions</a>
</p>

<br>

<pre align="center">pnpm add @hypernym/emitter</pre>

<p align="center">
  <sub>Package size: <code>~529 B</code> minified, <code>~283 B</code> gzip</sub>
</p>

<br>

## Features

- Ultra Lightweight & Powerful
- Framework Independent
- Written in TypeScript
- Native SSR Support
- No External Dependencies
- API Friendly

## CDN

### ESM (minified)

```html
<script type="module">
  import { createEmitter } from 'https://unpkg.com/@hypernym/emitter/dist/index.min.js'
  const emitter = createEmitter()
</script>
```

### IIFE (minified)

```html
<script src="https://unpkg.com/@hypernym/emitter/dist/index.iife.js"></script>
<script>
  const { createEmitter } = Emitter
  const emitter = createEmitter()
</script>
```

### UMD (minified)

```html
<script src="https://unpkg.com/@hypernym/emitter/dist/index.umd.js"></script>
<script>
  const { createEmitter } = Emitter
  const emitter = createEmitter()
</script>
```

## Usage

### JS

```js
import { createEmitter } from '@hypernym/emitter'

const emitter = createEmitter()

emitter.on('event-id', (e) => console.log(e.x, e.y))

emitter.emit('event-id', { x: 0, y: 0 })
```

### TS

```ts
import { createEmitter } from '@hypernym/emitter'

type Events = {
  'event-id': { x: number; y: number }
  // ...
}

const emitter = createEmitter<Events>()

emitter.on('event-id', (e) => console.log(e.x, e.y))

emitter.emit('event-id', { x: 0, y: 0 })
```

```ts
import { createEmitter, type Emitter } from '@hypernym/emitter'

type Events = {
  'event-id': { x: number; y: number }
  // ...
}

const emitter: Emitter<Events> = createEmitter<Events>()
```

## API

### .on()

- Type: `(id: Key, callback: EventCallback<Key, Events>, options?: EventOptions<Options>): () => void`

Registers an event listener for a specific event type. Also, supports an optional `object` param for advanced options logic.

Returns a cleanup function that removes the listener when called.

```ts
// Adds scroll listener
const off = emitter.on('scroll', ({ x, y }) => {
  console.log(x, y)
})

// Removes the listener
off()

// Adds scroll listener that will be called only `once`
emitter.on(
  'scroll',
  ({ x, y }) => {
    console.log(x, y)
  },
  { once: true },
)
```

### .off()

Type: `(id?: Key, callback?: EventCallback<Key, Events>): void`

Removes the registered event listeners.

```ts
// Removes all event listeners across all event types
emitter.off()

// Removes all click listeners
emitter.off('click')

// Custom scroll callback
const scrollCallback = ({ x, y }) => {
  console.log(x, y)
}

// Adds specific scroll listener
emitter.on('scroll', scrollCallback)

// Removes specific scroll callback
emitter.off('scroll', scrollCallback)
```

### .get()

- Type: `(id: Key, optionsId: OptionsID): EventDetails<keyof Events, Events, Options> | undefined`

Gets specific event details by `options.id` from the map.

Returns an object `{ id, callback, options }` or `undefined` if not found.

```ts
// Adds scroll event listener with custom options
emitter.on(
  'scroll',
  ({ x, y }) => {
    console.log(x, y)
  },
  { id: 'custom-scroll', a: true, b: false }, // `id` prop can be any string, number or symbol
)

// Gets event details by options.id `custom-scroll`
const details = emitter.get('scroll', 'custom-scroll')

if (details?.options?.a) console.log('run custom logic...')
```

### .emit()

- Type: `(id: Key, event: Events[Key] | ((details: EventDetails<Key, Events, Options>) => void)): void`

Emits a specific event.

```ts
// Emits scroll event with position data
emitter.emit('scroll', { x: 0, y: 0 })

// Emits event without second parameter
emitter.emit('event-id')

// Emits event only `once`
emitter.emit('event-id', ({ id, callback, options }) => {
  if (options?.once) {
    callback('event-state') // Triggers callback only `once` with event state
    emitter.off(id, callback) // Removes callback from the map
  }
})

// Emits event with custom logic
emitter.emit('scroll', ({ callback, options }) => {
  // Triggers callback with default event state
  callback({ x: 0, y: 0 })

  // Triggers callback with `custom` event state
  if (options?.id === 'custom') callback({ x: 100, y: 100 })
})
```

### .events

- Type: `Map<keyof Events, Map<EventCallback<keyof Events, Events>, EventDetails<keyof Events, Events>>>`

Main events map.

Stores all registered events.

```ts
emitter.events
```

### .has()

- Type: `(key: keyof Events): boolean`

Checks if a specific event by `id` exists in the map.

```ts
emitter.events.has(id: string | symbol)
```

### .get()

- Type: `(key: keyof Events): Map<EventCallback<keyof Events, Events>, EventDetails<keyof Events, Events>> | undefined`

Gets a specific event by `id` from the map.

```ts
emitter.events.get(id: string | symbol)
```

### .delete()

- Type: `(key: keyof Events): boolean`

Deletes a specific event by `id` from the map.

```ts
emitter.events.delete(id: string | symbol)
```

### .clear()

- Type: `(): void`

Removes all events from the map.

```ts
emitter.events.clear()
```

### .size

- Type: `number`

Indicates the number of registered events in the map.

```ts
emitter.events.size
```

## License

Developed in 🇭🇷 Croatia, © Hypernym Studio.

Released under the [MIT](LICENSE.txt) license.
