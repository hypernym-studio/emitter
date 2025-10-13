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

<br>

## Features

- TypeScript friendly
- Fully tree-shakeable
- No dependencies

<blockquote>
  <sub><strong>Package size</strong>: <code>~316 B</code> minified, <code>~219 B</code> gzip</sub>
</blockquote>

### CDN

Here are some examples of how to integrate **Emitter** from a CDN via a script tag.

Also, it is possible to download files manually and serve them accordingly.

#### ESM (minified)

```html
<script type="module">
  import { createEmitter } from 'https://unpkg.com/@hypernym/emitter/dist/index.min.js'
  const emitter = createEmitter()
</script>
```

#### IIFE (minified)

```html
<script src="https://unpkg.com/@hypernym/emitter/dist/index.iife.js"></script>
<script>
  const { createEmitter } = Emitter
  const emitter = createEmitter()
</script>
```

#### UMD (minified)

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
import { createEmitter, type Emitter } from '@hypernym/emitter'

type Events = {
  'event-id': { x: number; y: number }
  // ...
}

const emitter: Emitter<Events> = createEmitter<Events>()

emitter.on('event-id', (e) => console.log(e.x, e.y))

emitter.emit('event-id', { x: 0, y: 0 })
```

## API

### .on()

Registers an event listener for a specific event type.

Returns a cleanup function that removes the listener when called.

```ts
emitter.on<K>(id: K, callback: (event: Events[K]) => void): () => void
```

```ts
// Adds scroll listener
const off = emitter.on('scroll', ({ x, y }) => {
  console.log(x, y)
})

// Removes the listener
off()
```

### .off()

Removes event listeners.

```ts
emitter.off<K>(id?: K | undefined, callback?: ((event: Events[K]) => void) | undefined): void
```

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

### .emit()

Emits a specific event.

```ts
emitter.emit<K>(id: K, ...event: Events[K] extends undefined ? [event?: Events[K]] : [event: Events[K]]): void
```

```ts
// Emits scroll event with position data
emitter.emit('scroll', { x: window.scrollX, y: window.scrollY })

// Emits event without second parameter
emitter.emit('eventWithoutData')
```

### .events

Main events map.

Stores all registered events.

```ts
emitter.events
```

### .has()

Checks if a specific event by `id` exists in the map.

```ts
emitter.events.has(id: string | symbol)
```

### .get()

Gets a specific event by `id` from the map.

```ts
emitter.events.get(id: string | symbol)
```

### .delete()

Deletes a specific event by `id` from the map.

```ts
emitter.events.delete(id: string | symbol)
```

### .clear()

Removes all events from the map.

```ts
emitter.events.clear()
```

### .size

Indicates the number of registered events in the map.

```ts
emitter.events.size
```

## License

Developed in 🇭🇷 Croatia, © Hypernym Studio.

Released under the [MIT](LICENSE.txt) license.
