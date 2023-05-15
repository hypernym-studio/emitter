# Emitter

A super simple and lightweight event emitter.

<sub><a href="https://github.com/hypernym-studio/emitter">Repository</a> | <a href="https://www.npmjs.com/package/@hypernym/emitter">Package</a> | <a href="https://github.com/hypernym-studio/emitter/releases">Releases</a> | <a href="https://github.com/hypernym-studio/emitter/discussions">Discussions</a></sub>

## Features

- TypeScript friendly
- Supports CJS & ESM
- Zero dependencies
- Ultra lightweight

## Installation

```sh
npm i @hypernym/emitter
```

## Imports

```js
// CJS
const { createEmitter } = require('@hypernym/emitter')
```

```js
// ESM & TS
import { createEmitter } from '@hypernym/emitter'
```

## Usage

### JS

```js
import { createEmitter } from '@hypernym/emitter'

const emitter = createEmitter()

emitter.on('event-id', e => console.log(e.x, e.y))

emitter.emit('event-id', { x: 0, y: 0 })
```

### TS

```ts
import { createEmitter, Emitter } from '@hypernym/emitter'

type Events = {
  'event-id': { x: number; y: number }
  // ...
}

const emitter: Emitter<Events> = createEmitter<Events>()

emitter.on('event-id', e => console.log(e.x, e.y))

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

Feel free to use the official [discussions](https://github.com/hypernym-studio/emitter/discussions) for any additional questions.

## License

Developed in 🇭🇷 Croatia

Released under the [MIT](LICENSE.txt) license.

© Hypernym Studio
