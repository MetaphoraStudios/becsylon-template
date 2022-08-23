import { component, field } from '@lastolivegames/becsy';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Vector3Type } from '../types';

@component
export class Transform {
  @field(Vector3Type) declare position: Vector3;
  @field(Vector3Type) declare rotation: Vector3;
  @field(Vector3Type) declare scaling: Vector3;
}
