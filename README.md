[![Run on Repl.it](https://replit.com/badge/github/MetaphoraStudios/becsylon-template)](https://replit.com/@KosmiCKhaoz/becsylon-template)

# Becsylon Template

> A simple template for Typescript BabylonJS applications, using Becsy.

This implementation uses [Babylong Engine](https://babylonjs.com/) and
[Becsy](https://lastolivegames.github.io/becsy/) with TS and a simple build
system.  
It implements a simple scene with a ground, a sphere (which moves with the WASD
keys) and a pellet that can be collected.  
Collecting the Pellet simply prints to the `console` at the moment.

**Platform:** _Testing on Chrome + macOS only_

## Getting Started

1. Clone the repository
1. Run `npm install`
1. `npm run dev` runs the webpack local server, use it to test the setup
1. Follow the instructions in the console
1. Use WASD keys to move the sphere around

### More Commands

`npm run build`: Builds the application into the `dist` folder.  
`npm test`: Runs the `jest` tests.  
_As defined in `package.json`_

## Coding

`./public/index.html` defines the html template used by Webpack (no changes
required for now).  
The application code starts at `./src/app.ts`.  
You can change the scene, look for `// HERE: Change the scene here`.  
There are two scenes which are similar, see the `src/scenes/` folder.

Have fun!

Before committing, run `npm test` and `npm run lint` (this could be
automated).  
Prettier is used to format the code, I recommend setting it up with VSCode.

## Issues

- The cameras still use the Babylon default controls and not the System.
- There's a small bug where the Component values are set to default on the first
  tick.

### Setting up Prettier

**Install Prettier's extension (`ext install esbenp.prettier-vscode`).**  
I added the settings to the project, but I have no idea if that works with
VSCode, in case you need to add them manually, set these options in VSCode:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

Optional but recommended:

```json
{
  "editor.formatOnPaste": true,
  "files.autoSave": "onFocusChange"
}
```

### References

[Babylon JS Documentation](https://doc.babylonjs.com/).  
[Becsy Documentation](https://lastolivegames.github.io/becsy/).
