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

Registers a specific event.

```ts
emitter.on(id: string, callback: (event: any) => void)
```

### .emit()

Emits a specific event.

```ts
emitter.emit(id: string, event: any)
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
emitter.events.has(id: string)
```

### .get()

Gets a specific event by `id` from the map.

```ts
emitter.events.get(id: string)
```

### .delete()

Deletes a specific event by `id` from the map.

```ts
emitter.events.delete(id: string)
```

### .clear()

Removes all events from the map.

```ts
emitter.events.clear()
```

## Community

Feel free to ask questions or share new ideas.

Use the official [discussions](https://github.com/hypernym-studio/emitter/discussions) to get involved.

## License

Developed in 🇭🇷 Croatia, © Hypernym Studio.

Released under the [MIT](LICENSE.txt) license.
