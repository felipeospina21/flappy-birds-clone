# flappy-birds-clone

A Flappy Bird clone for the browser, built with [Phaser 3](https://phaser.io/) and webpack as a game development learning project.

## How to play

Press **Space** to flap. Avoid the pipes and don't hit the top or bottom of the screen. On game over the scene restarts after a second.

## Tech stack

- Phaser 3 (Arcade physics)
- JavaScript (ES modules, Babel)
- webpack 4

## Getting started

Requires Node 16 (see `.nvmrc`).

```bash
npm install
npm run dev     # Dev server with watch
npm run build   # Production build
```

## Project structure

```
src/
├── index.js             # Phaser game config
└── scenes/PlayScene.js  # Bird, pipes, input, collisions and game over
assets/                  # Sprites: bird, pipe, sky and others
```

> Built from a Phaser and webpack boilerplate. This was a learning project and is not actively maintained.
