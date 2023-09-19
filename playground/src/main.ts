import { createEmitter } from '../../src/index.js'
import type { Emitter } from '../../src/types/index.js'

type Events = {
  'event-id': { x: number; y: number }
  // ...
}

const emitter: Emitter<Events> = createEmitter<Events>()

emitter.on('event-id', (e) => console.log(e.x, e.y)) // 0 0

emitter.emit('event-id', { x: 0, y: 0 })

console.log(emitter.events) // Map(1) {'event-id' => Array(1)}

const eventId = emitter.events.get('event-id')

console.log(eventId) // (e) => console.log(e.x, e.y)

if (emitter.events.has('event-id')) emitter.events.delete('event-id')

console.log(emitter.events) // Map(0) {size: 0}
