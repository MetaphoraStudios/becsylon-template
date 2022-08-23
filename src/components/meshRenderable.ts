import { Mesh } from '@babylonjs/core';
import { component, field } from '@lastolivegames/becsy';

@component
export class MeshRenderable {
  // We'll need a reference to the mesh to update it.
  @field.object declare mesh: Mesh;
}
