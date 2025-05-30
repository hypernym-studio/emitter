import { createEmitter } from '@'
import type { Emitter } from '@/types'

type Events = {
  'event-1': { x: number; y: number }
  'event-2': { z: number }
  'event-3': undefined
  // ...
}

const emitter: Emitter<Events> = createEmitter<Events>()

emitter.on('event-1', (e) => console.log('emitter.on', e.x, e.y)) // 0 0

emitter.emit('event-1', { x: 0, y: 0 })

emitter.emit('event-2', { z: 0 })

emitter.emit('event-3')

const eventId = emitter.events.get('event-1')

console.log('emitter.get', eventId) // [0]: (e) => console.log("emitter.on", e.x, e.y)

emitter.off()

console.log('emitter.events', emitter.events) // Map(0) {size: 0}
