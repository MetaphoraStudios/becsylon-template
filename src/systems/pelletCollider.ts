import { System, system } from '@lastolivegames/becsy';
import { MeshRenderable } from '../components/meshRenderable';
import { Pellet, PelletEater } from '../components/pellets';
import { Transform } from '../components/transform';
import { MeshRenderer } from './meshRenderer';

@system((s) => s.after(MeshRenderer))
export class PelletCollider extends System {
  private readonly pellets = this.query(
    (q) =>
      q.current.with(MeshRenderable).and.with(Pellet).and.with(Transform).write
  );
  private readonly eaters = this.query(
    (q) => q.current.with(MeshRenderable).and.with(PelletEater).write
  );

  execute(): void {
    // SLOW CODE: Just for demo purposes
    for (const eater of this.eaters.current) {
      const { mesh: eaterMesh } = eater.read(MeshRenderable);
      for (const pellet of this.pellets.current) {
        const { mesh: pelletMesh } = pellet.read(MeshRenderable);
        if (eaterMesh.intersectsMesh(pelletMesh)) {
          console.log('Ate the pellet!');
          eater.write(PelletEater).pelletsEaten++;
        }
      }
    }
  }
}
