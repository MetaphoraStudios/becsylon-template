import { System, system } from '@lastolivegames/becsy';
import { KeyboardControlled } from '../components/keyboardControlled';
import { Velocity } from '../components/velocity';

/*
 *               ┌─────────────────────┐
 *               │                     │
 *               │  Controller System  │
 *     ┌─────────┼┐                    │      ┌────────────┐
 *     │         ││                    │      │            │
 *     │  Inputs │┼──►last seen input  │      │   Entity   │
 *     │         ││            │       │      │            │
 *     └─────────┼┘            │       │      │            │
 * Inputs can    │        ┌────▼───────┼┐    ┌┼──────────┐ │
 * refresh out of│        │  execute() │┼────►│ Velocity │ │
 * sync with game│        └────────────┼┘    └┼──────────┘ │
 * loop          │                     │      │            │
 *               │                     │      │            │
 *               └─────────────────────┘      └────────────┘
 */
@system
export class VelocityInputController extends System {
  private readonly movables = this.query(
    (q) => q.current.with(KeyboardControlled).with(Velocity).write
  );

  private readonly keysPressed = new Set<string>();

  initialize(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      this.keysPressed.add(event.key);
    });

    document.addEventListener('keyup', (event: KeyboardEvent) => {
      this.keysPressed.delete(event.key);
    });
  }

  execute(): void {
    const velocityStep = 0.005;
    for (const movable of this.movables.current) {
      const velocity = movable.write(Velocity);

      if (this.keysPressed.has('w')) velocity.value.z = -velocityStep;
      else if (this.keysPressed.has('s')) velocity.value.z = velocityStep;
      else velocity.value.z = 0;

      if (this.keysPressed.has('a')) velocity.value.x = velocityStep;
      else if (this.keysPressed.has('d')) velocity.value.x = -velocityStep;
      else velocity.value.x = 0;
    }
  }
}
