import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import { Engine, Scene, Nullable } from '@babylonjs/core';
import { World } from '@lastolivegames/becsy';
import { createPelletsScene } from './scenes/pellets';

class Game {
  public static async createWithBabylonBackend(
    canvasId: string = 'gameCanvas'
  ): Promise<Game> {
    // Get the target canvas
    const canvas = document.getElementById(
      canvasId
    ) as Nullable<HTMLCanvasElement>;
    if (!canvas) {
      throw new Error('Canvas not found');
    }

    // Initialize babylon scene and engine
    const engine = new Engine(canvas, true);
    const world = await World.create();
    // HERE: Change the scene here
    const scene = createPelletsScene(engine, world);

    return new Game(engine, world, scene);
  }

  private constructor(
    private readonly engine: Engine,
    private readonly world: World,
    private readonly scene: Scene
  ) {}

  public run(): void {
    // register event handlers
    this.registerInspectorHandler(this.scene);
    this.registerResizeHandler(this.engine);

    // run the main render loop
    this.engine.runRenderLoop(() => {
      this.world.execute(performance.now(), this.engine.getDeltaTime());
      this.scene.render();
    });
  }

  private registerInspectorHandler(scene: Scene) {
    window.addEventListener('keydown', (ev) => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.code === 'KeyI') {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
      }
    });
  }

  private registerResizeHandler(engine: Engine) {
    window.addEventListener('resize', () => {
      if (!engine) {
        return;
      }

      engine.resize();
    });
  }
}

const game = Game.createWithBabylonBackend();
game.then((game) => game.run());
