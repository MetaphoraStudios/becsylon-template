import { System, system } from '@lastolivegames/becsy';
import { MeshRenderable } from '../components/meshRenderable';
import { Transform } from '../components/transform';
import { Movement } from './movement';

@system((s) => s.after(Movement))
export class MeshRenderer extends System {
  private readonly renderables = this.query(
    (q) => q.addedOrChanged.with(MeshRenderable).and.with(Transform).trackWrites
  );

  execute(): void {
    for (const renderable of this.renderables.addedOrChanged) {
      const transform = renderable.read(Transform);
      // Marked as read because we're only writing in the reference
      // This was recommended by the Becsy docs
      const { mesh } = renderable.read(MeshRenderable);

      // We update directly to avoid creating a new Vector3
      mesh.position.x = transform.position.x;
      mesh.position.y = transform.position.y;
      mesh.position.z = transform.position.z;

      mesh.rotation.x = transform.rotation.x;
      mesh.rotation.y = transform.rotation.y;
      mesh.rotation.z = transform.rotation.z;

      mesh.scaling.x = transform.scaling.x;
      mesh.scaling.y = transform.scaling.y;
      mesh.scaling.z = transform.scaling.z;
    }
  }
}
