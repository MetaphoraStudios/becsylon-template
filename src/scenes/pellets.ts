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
import { Player } from '../components/player';
import { Pellet, PelletEater } from '../components/pellets';
import { PelletCollider } from '../systems/pelletCollider';

export function createPelletsScene(
  engine: Babylon.Engine,
  world: World
): Babylon.Scene {
  let scene = new Babylon.Scene(engine);

  createCamera(world, scene);
  createEnvironment(scene);
  createEntities(world, scene);
  createSystems();

  return scene;
}

function createCamera(world: World, scene: Babylon.Scene) {
  let camera: Babylon.Camera = new Babylon.ArcRotateCamera(
    'Camera',
    Math.PI / 2,
    Math.PI / 4,
    6,
    Vector3.Zero(),
    scene
  );
  world.createEntity(Camera, { camera }, Transform, {
    position: camera.position.asArray(),
  });
}

function createEnvironment(scene: Babylon.Scene) {
  new Babylon.HemisphericLight('light1', new Vector3(1, 1, 0), scene);
  Babylon.MeshBuilder.CreateGround('ground', { width: 12, height: 12 }, scene);
}

function createEntities(world: World, scene: Babylon.Scene) {
  let sphere: Babylon.Mesh = Babylon.MeshBuilder.CreateSphere(
    'sphere',
    { diameter: 1 },
    scene
  );
  sphere.position.y = 0.5;
  world.createEntity(
    Player,
    KeyboardControlled,
    MeshRenderable,
    { mesh: sphere },
    Transform,
    {
      position: sphere.position.asArray(),
      rotation: sphere.rotation.asArray(),
      scaling: sphere.scaling.asArray(),
    },
    Velocity,
    PelletEater
  );

  // TODO: Move this to a factory system
  let pellet: Babylon.Mesh = Babylon.MeshBuilder.CreateBox('pellet', {}, scene);
  pellet.position = new Vector3(3, 0.5, -2);

  world.createEntity(Pellet, MeshRenderable, { mesh: pellet }, Transform, {
    position: pellet.position.asArray(),
    rotation: pellet.rotation.asArray(),
    scaling: [0.5, 0.5, 0.5],
  });
}

function createSystems() {
  new VelocityInputController();
  new Movement();
  new MeshRenderer();
  new PelletCollider();
}
