import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene'

const SHARED_CONFIG = {
  width: 800,
  height: 600,
}
const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 200 },
      debug: true,
    },
  },
  scene: [new PlayScene(SHARED_CONFIG)],
};

new Phaser.Game(config);






