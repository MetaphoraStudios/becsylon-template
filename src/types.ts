import { Type } from '@lastolivegames/becsy';
import { Vector3 } from '@babylonjs/core/Maths/math';

export const Vector3Type = Type.vector(Type.float64, ['x', 'y', 'z'], Vector3);
