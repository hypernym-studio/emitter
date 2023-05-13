# Emitter

A super simple and lightweight event emitter.

## Features

- TypeScript friendly
- Supports CJS & ESM
- Zero dependencies
- Ultra lightweight

## Installation

```sh
npm i @hypernym/emitter
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

```ts
emitter.on(id: string, callback: (event: any) => void)
```

### .emit()

```ts
emitter.emit(id: string, event: any)
```

### .clear()

```ts
emitter.events.clear()
```

## Community

Feel free to use the official [discussions](https://github.com/hypernym-studio/emitter/discussions) for any additional questions.

## License

Developed in 🇭🇷 Croatia

Released under the [MIT](LICENSE.txt) license.

© Hypernym Studio
