import Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {
  constructor(config) {
    super('PlayScene');
    this.config = config;

    this.bird;
    this.initBirdConfig = {
      x: this.config.width * 0.1,
      y: this.config.height / 2,
      gravity: 600,
    };

    this.pipes;
    this.pipesCount = 0;
    this.pipesToRender = 4;
    this.pipeVelocity = -200;

    this.flapVelocity = -300;
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('pipe', 'assets/pipe.png');
  }

  create() {
    this.createBackground();
    this.createBird();
    this.createPipes();
    this.handleInput();
    this.createCollider();
  }

  update(time, delta) {
    this.checkBirdPosition();
    this.recyclePipes();
  }

  checkBirdPosition() {
    const lowerBoundLimit = this.bird.getBounds().bottom >= this.config.height;
    const upperBoundLimit = this.bird.getBounds().top <= 0;
    const outOfBounds = lowerBoundLimit || upperBoundLimit;
    if (outOfBounds) {
      this.gameOver();
    }
  }

  gameOver() {
    this.physics.pause();
    this.bird.setTint(0xff4530);

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false,
    });
  }

  handleInput() {
    this.input.keyboard.on('keydown_SPACE', this.flap, this);
  }

  flap() {
    this.bird.body.velocity.y = this.flapVelocity;
  }

  createCollider() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
  }

  createBackground() {
    this.add.image(400, 300, 'sky');
  }

  createBird() {
    this.bird = this.physics.add
      .sprite(this.initBirdConfig.x, this.initBirdConfig.y, 'bird')
      .setOrigin(0);
    this.bird.body.gravity.y = this.initBirdConfig.gravity;
    this.bird.setCollideWorldBounds(true);
  }
  createPipes() {
    this.pipes = this.physics.add.group();
    this.pipesCount = 0;
    while (this.pipesCount < this.pipesToRender) {
      const upperPipe = this.pipes.create(0, 0, 'pipe').setImmovable(true).setOrigin(0, 1);
      const lowerPipe = this.pipes.create(0, 0, 'pipe').setImmovable(true).setOrigin(0, 0);
      this.setPipePoisition(upperPipe, lowerPipe);
      this.pipesCount++;
    }

    this.pipes.setVelocityX(this.pipeVelocity);
  }

  getRightMostPipe() {
    let rightMostX = 0;
    this.pipes.getChildren().forEach((pipe) => {
      rightMostX = Math.max(pipe.x, rightMostX);
    });

    return rightMostX;
  }

  setPipePoisition(uPipe, lPipe) {
    const rightMostPipeX = this.getRightMostPipe();
    const pipesVerticalGap = Phaser.Math.Between(150, 250);
    const upperPipeMaxYBound = 600 - pipesVerticalGap - 20;
    const upperPipeYPosition = Phaser.Math.Between(20, upperPipeMaxYBound);
    const pipesHorizontalGap = Phaser.Math.Between(400, 550);

    uPipe.x = rightMostPipeX + pipesHorizontalGap;
    uPipe.y = upperPipeYPosition;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipesVerticalGap;
  }

  recyclePipes() {
    const tempPipes = [];
    this.pipes.getChildren().forEach((pipe) => {
      if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);
        if (tempPipes.length === 2) {
          this.setPipePoisition(...tempPipes);
        }
      }
    });
  }
}
