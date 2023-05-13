import { createEmitter } from '../../src/emitter'
import type { Emitter } from '../../src/types'

type Events = {
  'event-id': { x: number; y: number }
  // ...
}

const emitter: Emitter<Events> = createEmitter<Events>()

emitter.on('event-id', e => console.log(e.x, e.y))

emitter.emit('event-id', { x: 0, y: 0 })

console.log(emitter.events)
