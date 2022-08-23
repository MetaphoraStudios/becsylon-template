import * as Babylon from '@babylonjs/core';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { World } from '@lastolivegames/becsy';
import { Movement } from '../systems/movement';
import { MeshRenderer } from '../systems/meshRenderer';
import { VelocityInputController } from '../systems/velocityController';
import { MeshRenderable } from '../components/meshRenderable';
import { Transform } from '../components/transform';
import { Velocity } from '../components/velocity';
import { Camera } from '../components/camera';
import { KeyboardControlled } from '../components/keyboardControlled';

export function createSampleScene(
  engine: Babylon.Engine,
  world: World,
  canvas: HTMLCanvasElement
): Babylon.Scene {
  let scene = new Babylon.Scene(engine);

  createCamera(world, canvas, scene);
  createEnvironment(scene);
  createEntities(world, scene);
  createSystems();

  return scene;
}

function createCamera(
  world: World,
  canvas: HTMLCanvasElement,
  scene: Babylon.Scene
) {
  let camera: Babylon.Camera = new Babylon.ArcRotateCamera(
    'Camera',
    Math.PI / 2,
    Math.PI / 4,
    6,
    Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);
  world.createEntity(Camera, { camera }, Transform, {
    position: camera.position.asArray(),
  });
}

function createEnvironment(scene: Babylon.Scene) {
  new Babylon.HemisphericLight('light1', new Vector3(1, 1, 0), scene);
  Babylon.MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);
}

function createEntities(world: World, scene: Babylon.Scene) {
  let sphere: Babylon.Mesh = Babylon.MeshBuilder.CreateSphere(
    'sphere',
    { diameter: 1 },
    scene
  );
  sphere.position.y = 0.5;
  world.createEntity(
    KeyboardControlled,
    MeshRenderable,
    { mesh: sphere },
    Transform,
    {
      position: sphere.position.asArray(),
      rotation: sphere.rotation.asArray(),
      scaling: sphere.scaling.asArray(),
    },
    Velocity
  );
}

function createSystems() {
  new VelocityInputController();
  new Movement();
  new MeshRenderer();
}
