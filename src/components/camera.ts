import { Camera as BabylonCamera } from '@babylonjs/core';
import { component, field } from '@lastolivegames/becsy';

@component
export class Camera {
  // We'll need a reference to the camera to update it.
  @field.object declare camera: BabylonCamera;
}
