import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { component, field } from '@lastolivegames/becsy';
import { Vector3Type } from '../types';

@component
export class Velocity {
  @field(Vector3Type) declare value: Vector3;
}
