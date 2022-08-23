import { System, system } from '@lastolivegames/becsy';
import { Transform } from '../components/transform';
import { Velocity } from '../components/velocity';

@system
export class Movement extends System {
  private readonly movables = this.query(
    (q) => q.current.with(Velocity).and.with(Transform).write
  );

  execute(): void {
    for (const movable of this.movables.current) {
      const velocity = movable.read(Velocity);
      const { position } = movable.write(Transform);
      position.x += this.delta * velocity.value.x;
      position.z += this.delta * velocity.value.z;
    }
  }
}
