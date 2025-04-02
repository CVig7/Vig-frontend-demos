const initiateButton = document.getElementById("initiate-game-button");
const gameCanvas = document.getElementById("game-canvas");
const introScreen = document.querySelector(".game-intro-screen");
const finalCheckpointScreen = document.querySelector(".checkpoint-message-screen");
const finalCheckpointText = document.querySelector(".checkpoint-message-screen > p");
const context = gameCanvas.getContext("2d");
gameCanvas.width = innerWidth;
gameCanvas.height = innerHeight;
const fallAcceleration = 0.5;
let checkpointDetectionActive = true;

const getScaledSize = (dimension) => {
  return innerHeight < 500 ? Math.ceil((dimension / 500) * innerHeight) : dimension;
};

class Hero {
  constructor() {
    this.position = {
      x: getScaledSize(10),
      y: getScaledSize(400),
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = getScaledSize(40);
    this.height = getScaledSize(40);
  }
  draw() {
    context.fillStyle = "#99c9ff";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= gameCanvas.height) {
      if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y = fallAcceleration;
      }
      this.velocity.y += fallAcceleration;
    } else {
      this.velocity.y = 0;
    }

    if (this.position.x < this.width) {
      this.position.x = this.width;
    }

    if (this.position.x >= gameCanvas.width - this.width * 2) {
      this.position.x = gameCanvas.width - this.width * 2;
    }
  }
}

class Terrain {
  constructor(x, y) {
    this.position = {
      x,
      y,
    };
    this.width = 200;
    this.height = getScaledSize(40);
  }
  draw() {
    context.fillStyle = "#acd157";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Flag {
  constructor(x, y, z) {
    this.position = {
      x,
      y,
    };
    this.width = getScaledSize(40);
    this.height = getScaledSize(70);
    this.claimed = false;
  };

  draw() {
    context.fillStyle = "#f1be32";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  claim() {
    this.width = 0;
    this.height = 0;
    this.position.y = Infinity;
    this.claimed = true;
  }
};

const hero = new Hero();

const terrainSpots = [
  { x: 500, y: getScaledSize(450) },
  { x: 700, y: getScaledSize(400) },
  { x: 850, y: getScaledSize(350) },
  { x: 900, y: getScaledSize(350) },
  { x: 1050, y: getScaledSize(150) },
  { x: 2500, y: getScaledSize(450) },
  { x: 2900, y: getScaledSize(400) },
  { x: 3150, y: getScaledSize(350) },
  { x: 3900, y: getScaledSize(450) },
  { x: 4200, y: getScaledSize(400) },
  { x: 4400, y: getScaledSize(200) },
  { x: 4700, y: getScaledSize(150) },
];

const terrainList = terrainSpots.map(
  (spot) => new Terrain(spot.x, spot.y)
);

const flagSpots = [
  { x: 1170, y: getScaledSize(80), z: 1 },
  { x: 2900, y: getScaledSize(330), z: 2 },
  { x: 4800, y: getScaledSize(80), z: 3 },
];

const flags = flagSpots.map(
  (point) => new Flag(point.x, point.y, point.z)
);

const animateGame = () => {
  requestAnimationFrame(animateGame);
  context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  terrainList.forEach((terrain) => terrain.draw());
  flags.forEach((flag) => flag.draw());
  hero.update();

  if (userInputs.right.pressed && hero.position.x < getScaledSize(400)) {
    hero.velocity.x = 5;
  } else if (userInputs.left.pressed && hero.position.x > getScaledSize(100)) {
    hero.velocity.x = -5;
  } else {
    hero.velocity.x = 0;

    if (userInputs.right.pressed && checkpointDetectionActive) {
      terrainList.forEach((terrain) => (terrain.position.x -= 5));
      flags.forEach((flag) => (flag.position.x -= 5));
    } else if (userInputs.left.pressed && checkpointDetectionActive) {
      terrainList.forEach((terrain) => (terrain.position.x += 5));
      flags.forEach((flag) => (flag.position.x += 5));
    }
  }

  terrainList.forEach((terrain) => {
    const conditionsAbove = [
      hero.position.y + hero.height <= terrain.position.y,
      hero.position.y + hero.height + hero.velocity.y >= terrain.position.y,
      hero.position.x >= terrain.position.x - hero.width / 2,
      hero.position.x <= terrain.position.x + terrain.width - hero.width / 3,
    ];

    if (conditionsAbove.every(Boolean)) {
      hero.velocity.y = 0;
      return;
    }

    const collisionSides = [
      hero.position.x >= terrain.position.x - hero.width / 2,
      hero.position.x <= terrain.position.x + terrain.width - hero.width / 3,
      hero.position.y + hero.height >= terrain.position.y,
      hero.position.y <= terrain.position.y + terrain.height,
    ];

    if (collisionSides.every(Boolean)) {
      hero.position.y = terrain.position.y + hero.height;
      hero.velocity.y = fallAcceleration;
    }
  });

  flags.forEach((flag, idx, flags) => {
    const flagConditions = [
      hero.position.x >= flag.position.x,
      hero.position.y >= flag.position.y,
      hero.position.y + hero.height <= flag.position.y + flag.height,
      checkpointDetectionActive,
      hero.position.x - hero.width <= flag.position.x - flag.width + hero.width * 0.9,
      idx === 0 || flags[idx - 1].claimed,
    ];

    if (flagConditions.every(Boolean)) {
      flag.claim();
      if (idx === flags.length - 1) {
        checkpointDetectionActive = false;
        showCheckpointNotice("Your on 🔥!");
        handleHeroMovement("ArrowRight", 0, false);
      }
    }
  });
};

const userInputs = {
  right: { pressed: false },
  left: { pressed: false },
};

const handleHeroMovement = (inputKey, xSpeed, keyPressed) => {
  if (!checkpointDetectionActive) {
    hero.velocity.x = 0;
    hero.velocity.y = 0;
    return;
  }
  switch (inputKey) {
    case "ArrowLeft":
      userInputs.left.pressed = keyPressed;
      if (xSpeed === 0) hero.velocity.x = xSpeed;
      hero.velocity.x -= xSpeed;
      break;
    case "ArrowUp":
    case " ":
    case "Spacebar":
      hero.velocity.y -= 8;
      break;
    case "ArrowRight":
      userInputs.right.pressed = keyPressed;
      if (xSpeed === 0) hero.velocity.x = xSpeed;
      hero.velocity.x += xSpeed;
      break;
  }
};

const startGame = () => {
  gameCanvas.style.display = "block";
  introScreen.style.display = "none";
  animateGame();
};

const showCheckpointNotice = (message) => {
  finalCheckpointScreen.style.display = "block";
  finalCheckpointText.textContent = message;
  if (checkpointDetectionActive) {
    setTimeout(() => (finalCheckpointScreen.style.display = "none"), 2000);
  }
};

initiateButton.addEventListener("click", startGame);

window.addEventListener("keydown", ({ key }) => {
  handleHeroMovement(key, 8, true);
});

window.addEventListener("keyup", ({ key }) => {
  handleHeroMovement(key, 0, false);
});