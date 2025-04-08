// 🚀 DOM Element Selection & Setup
const initiateButton = document.getElementById("initiate-game-button");
const gameCanvas = document.getElementById("game-canvas");
const bgMusic = document.getElementById("bg-music");
const introScreen = document.querySelector(".game-intro-screen");
const finalCheckpointScreen = document.querySelector(
  ".checkpoint-message-screen"
);
const finalCheckpointText = document.querySelector(
  ".checkpoint-message-screen > p"
);
const finalCheckpointTitle = document.querySelector(
  ".checkpoint-message-screen > h2"
);
const context = gameCanvas.getContext("2d");
let lastFrameTime = performance.now();
let frameCount = 0;
let fps = 0;
let previousTimestamp = performance.now();
// 📐 Set canvas size to full window
gameCanvas.width = innerWidth;
gameCanvas.height = innerHeight;

// ⚙️ Game Constants
const fallAcceleration = 0.5;
let checkpointDetectionActive = true;

// 🔧 Utility to scale based on window size
const getScaledSize = (dimension) => {
  return innerHeight < 500
    ? Math.ceil((dimension / 500) * innerHeight)
    : dimension;
};

// 🦸‍♂️ Hero (Player) Class
class Hero {
  constructor() {
    this.position = { x: getScaledSize(10), y: getScaledSize(400) };
    this.velocity = { x: 0, y: 0 };
    this.width = getScaledSize(40);
    this.height = getScaledSize(40);
    this.color = "black";
  }
  draw() {
    context.fillStyle = "black";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Gravity & Bounds
    if (this.position.y + this.height + this.velocity.y <= gameCanvas.height) {
      if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y = fallAcceleration;
      }
      this.velocity.y += fallAcceleration;
    } else {
      this.velocity.y = 0;
    }

    // Left/right bounds
    if (this.position.x < this.width) {
      this.position.x = this.width;
    }
    if (this.position.x >= gameCanvas.width - this.width * 2) {
      this.position.x = gameCanvas.width - this.width * 2;
    }
  }
}

// 👾 Enemy Class
class Enemy {
  constructor(x, y) {
    this.position = { x, y };
    this.velocity = { x: 0, y: 0 };
    this.width = getScaledSize(40);
    this.height = getScaledSize(40);
    this.color = "red";
    this.speed = 1.0;
  }

  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(targetX, targetY) {
    // Movement toward the player (X only for now)
    const dx = targetX - this.position.x;
    const distance = Math.abs(dx);
    if (distance > 1) {
      this.velocity.x = (dx / distance) * this.speed;
    } else {
      this.velocity.x = 0;
    }

    // Gravity
    this.velocity.y += fallAcceleration;

    // Apply velocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.draw();
  }
}

// 🌱 Terrain Class (Ground Platforms)
class Terrain {
  constructor(x, y) {
    this.position = { x, y };
    this.width = 200;
    this.height = getScaledSize(40);

    //Strobe Light
    this.color = ["blue", "white", "orange"];
    this.currentColorIndex = Math.floor(Math.random() * this.color.length);
    this.framrate = 0;
  }
  draw() {
    context.fillStyle = "blue";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

// 🚩 Flag Class (Checkpoints)
class Flag {
  constructor(x, y, z) {
    this.position = { x, y };
    this.width = getScaledSize(40);
    this.height = getScaledSize(70);
    this.claimed = false;
  }
  draw() {
    context.fillStyle = "gold";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  claim() {
    this.width = 0;
    this.height = 0;
    this.position.y = Infinity;
    this.claimed = true;
  }
}

// 🛠️ Object Instances
const hero = new Hero();
const enemy = new Enemy(1400, gameCanvas.height - getScaledSize(40));

// 🧱 Level Layout: Terrain Blocks
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
  { x: 5100, y: getScaledSize(180) },
  { x: 5500, y: getScaledSize(260) },
  { x: 5900, y: getScaledSize(300) },
  { x: 6300, y: getScaledSize(340) },
  { x: 6600, y: getScaledSize(380) },
  { x: 7000, y: getScaledSize(350) },
  { x: 7400, y: getScaledSize(300) },
  { x: 7800, y: getScaledSize(300) },
  { x: 8100, y: getScaledSize(280) },
  { x: 8400, y: getScaledSize(330) },
  { x: 8700, y: getScaledSize(360) },
  { x: 9000, y: getScaledSize(400) },
  { x: 9300, y: getScaledSize(420) },
  { x: 9600, y: getScaledSize(300) },
  { x: 9900, y: getScaledSize(280) },
  { x: 10200, y: getScaledSize(260) },
  { x: 10500, y: getScaledSize(240) },
  { x: 10800, y: getScaledSize(300) },
];
const terrainList = terrainSpots.map((spot) => new Terrain(spot.x, spot.y));

let heroCanJump = true;

// 🏁 Level Layout: Flags (Checkpoints)
const flagSpots = [
  { x: 1170, y: getScaledSize(80), z: 1 },
  { x: 2900, y: getScaledSize(330), z: 2 },
  { x: 4700, y: getScaledSize(80), z: 3 },
  { x: 5500, y: getScaledSize(190), z: 4 },
  { x: 7000, y: getScaledSize(280), z: 5 },
  { x: 7800, y: getScaledSize(230), z: 6 },
  { x: 8700, y: getScaledSize(290), z: 7 },
  { x: 9600, y: getScaledSize(230), z: 8 },
  { x: 10500, y: getScaledSize(170), z: 9 },  
];
const flags = flagSpots.map((point) => new Flag(point.x, point.y, point.z));

document.body.classList.add("playing");
// 🎮 Main Game Loop
const animateGame = () => {
  const now = performance.now();
  const delta = now - lastFrameTime;
  frameCount++;

  if (delta >= 1000) {
    fps = frameCount;
    frameCount = 0;
    lastFrameTime = now;
    console.log(`FPS: ${fps}`);
  }

  requestAnimationFrame(animateGame);
  context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  // Draw game elements
  terrainList.forEach((terrain) => terrain.draw());
  flags.forEach((flag) => flag.draw());
  hero.update();
  enemy.update(hero.position.x, hero.position.y);

  // Handle hero movement and side-scrolling
  if (userInputs.right.pressed && hero.position.x < getScaledSize(400)) {
    hero.velocity.x = 5;
  } else if (userInputs.left.pressed && hero.position.x > getScaledSize(100)) {
    hero.velocity.x = -5;
  } else {
    hero.velocity.x = 0;
    // Side-scroll environment
    if (userInputs.right.pressed && checkpointDetectionActive) {
      terrainList.forEach((terrain) => (terrain.position.x -= 5));
      flags.forEach((flag) => (flag.position.x -= 5));
    } else if (userInputs.left.pressed && checkpointDetectionActive) {
      terrainList.forEach((terrain) => (terrain.position.x += 5));
      flags.forEach((flag) => (flag.position.x += 5));
    }
  }

  // Platform collision logic
  terrainList.forEach((terrain) => {
    // Calculate the hero's next vertical position
    const nextY = hero.position.y + hero.velocity.y;
    const isFalling = hero.velocity.y >= 0;

    // Check if hero is falling and about to land
    const willLandOnTop =
      hero.position.x + hero.width > terrain.position.x &&
      hero.position.x < terrain.position.x + terrain.width &&
      hero.position.y + hero.height <= terrain.position.y &&
      nextY + hero.height >= terrain.position.y;

    if (willLandOnTop) {
      // Land on top
      hero.velocity.y = 0;
      hero.position.y = terrain.position.y - hero.height;
      heroCanJump = true;
    } else {
      const isStandingStillOnTop =
        hero.position.y + hero.height === terrain.position.y &&
        hero.position.x + hero.width > terrain.position.x &&
        hero.position.x < terrain.position.x + terrain.width;

      if (isStandingStillOnTop) {
        heroCanJump = true;
      }
    }

    const isCollidingHorizontally =
      hero.position.y + hero.height > terrain.position.y &&
      hero.position.y < terrain.position.y + terrain.height &&
      hero.position.x + hero.width > terrain.position.x &&
      hero.position.x < terrain.position.x + terrain.width;

    if (isCollidingHorizontally && !willLandOnTop) {
      // Push hero out of terrain if intersecting sideways
      if (hero.position.x < terrain.position.x) {
        hero.position.x = terrain.position.x - hero.width;
      } else {
        hero.position.x = terrain.position.x + terrain.width;
      }
    }
    const isBumpingFromBelow =
      hero.position.y >= terrain.position.y + terrain.height &&
      nextY <= terrain.position.y + terrain.height &&
      hero.position.x + hero.width > terrain.position.x &&
      hero.position.x < terrain.position.x + terrain.width;

    if (isBumpingFromBelow) {
      hero.velocity.y = 1;
      hero.position.y = terrain.position.y + terrain.height + 1;
      heroCanJump = false;
    }
  }); // End of terrain collision
  //Hero floor
  if (
    hero.position.y + hero.height >= gameCanvas.height &&
    hero.velocity.y === 0
  ) {
    heroCanJump = true;
  }
  //Enemy floor
  if (enemy.position.y + enemy.height >= gameCanvas.height) {
    enemy.velocity.y = 0;
    enemy.position.y = gameCanvas.height - enemy.height;
  }
  // Enemy collision logic
  terrainList.forEach((terrain) => {
    const nextY = enemy.position.y + enemy.velocity.y;
    const willEnemyLand =
      enemy.position.x + enemy.width > terrain.position.x &&
      enemy.position.x < terrain.position.x + terrain.width &&
      enemy.position.y + enemy.height <= terrain.position.y &&
      nextY + enemy.height >= terrain.position.y;

    if (willEnemyLand) {
      enemy.velocity.y = 0;
      enemy.position.y = terrain.position.y - enemy.height;
    }

    const enemyHitsSide =
      enemy.position.y + enemy.height > terrain.position.y &&
      enemy.position.y < terrain.position.y + terrain.height &&
      enemy.position.x + enemy.width > terrain.position.x &&
      enemy.position.x < terrain.position.x + terrain.width;

    if (enemyHitsSide && !willEnemyLand) {
      if (enemy.position.x < terrain.position.x) {
        enemy.position.x = terrain.position.x - enemy.width;
      } else {
        enemy.position.x = terrain.position.x + terrain.width;
      }
    }

    const enemyBumpsFromBelow =
      enemy.position.y >= terrain.position.y + terrain.height &&
      nextY <= terrain.position.y + terrain.height &&
      enemy.position.x + enemy.width > terrain.position.x &&
      enemy.position.x < terrain.position.x + terrain.width;

    if (enemyBumpsFromBelow) {
      enemy.velocity.y = 1;
      enemy.position.y = terrain.position.y + terrain.height + 1;
    }
  });

  // Hero-enemy collision
  const isHeroCollidingWithEnemy =
    hero.position.x < enemy.position.x + enemy.width &&
    hero.position.x + hero.width > enemy.position.x &&
    hero.position.y < enemy.position.y + enemy.height &&
    hero.position.y + hero.height > enemy.position.y;

  if (isHeroCollidingWithEnemy) {
    // You can add game over logic, life reduction, or knockback here
    showCheckpointNotice("You've been caught!", "Game Over!");
    checkpointDetectionActive = false;
    hero.velocity.x = 0;
    hero.velocity.y = 0;
  }

  // Flag collision (checkpoint claim)
  flags.forEach((flag, idx, flags) => {
    const flagConditions = [
      hero.position.x >= flag.position.x,
      hero.position.y >= flag.position.y,
      hero.position.y + hero.height <= flag.position.y + flag.height,
      checkpointDetectionActive,
      hero.position.x - hero.width <=
        flag.position.x - flag.width + hero.width * 0.9,
      idx === 0 || flags[idx - 1].claimed,
    ];
    if (flagConditions.every(Boolean)) {
      flag.claim();
      if (idx === flags.length - 1) {
        checkpointDetectionActive = false;
        showCheckpointNotice(
          "You have reached the last checkpoint!🔥",
          "BOOM-SHACKA-LAKA!"
        );
        handleHeroMovement("ArrowRight", 0, false);
      }
    }
  });
};

// 🎮 Player Input State
const userInputs = {
  right: { pressed: false },
  left: { pressed: false },
};

// 🎯 Handle Hero Movement
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
      if (heroCanJump || hero.velocity.y === 0) {
        hero.velocity.y = -8;
      }
      break;
    case "ArrowRight":
      userInputs.right.pressed = keyPressed;
      if (xSpeed === 0) hero.velocity.x = xSpeed;
      hero.velocity.x += xSpeed;
      break;
  }
};

// 🏁 Start Game
const startGame = () => {
  gameCanvas.style.display = "block";
  introScreen.style.display = "none";

  //Start background music
  bgMusic.volume = 0.5; // volume adjustment
  bgMusic.play().catch((err) => {
    console.warn("Autoplay failed — user interaction might be required.");
    console.error(err);
  });

  animateGame();
};

// Show Checkpoint Message
const showCheckpointNotice = (message, title = "Checkpoint!") => {
  finalCheckpointScreen.style.display = "block";
  finalCheckpointTitle.textContent = title;
  finalCheckpointText.textContent = message;

  if (checkpointDetectionActive) {
    setTimeout(() => (finalCheckpointScreen.style.display = "none"), 2000);
  }
};

// Event Listeners
initiateButton.addEventListener("click", startGame);
window.addEventListener("keydown", ({ key }) => {
  handleHeroMovement(key, 8, true);
});

window.addEventListener("keyup", ({ key }) => {
  handleHeroMovement(key, 0, false);
});
