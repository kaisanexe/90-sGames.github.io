// ===== GAME SWITCHER =====

function showGame(gameName) {

  document.querySelectorAll('.game-container').forEach(container => {
    container.classList.remove('active');
  });

  document
    .getElementById(`${gameName}-game-container`)
    .classList.add('active');

  switch(gameName) {
    case 'snake':
      initSnake();
      break;

    case 'pong':
      console.log("Pong initialized");
      break;

    case 'breakout':
      console.log("Breakout initialized");
      break;

    case 'space-invaders':
      console.log("Space Invaders initialized");
      break;

    case 'tetris':
      console.log("Tetris initialized");
      break;
  }
}

// SHOW DEFAULT GAME

window.onload = () => {
  showGame('snake');
};

// ===== SNAKE GAME =====

function initSnake() {

  const canvas = document.getElementById('snake-game');
  const ctx = canvas.getContext('2d');

  const scoreElement = document.getElementById('snake-score');

  const gridSize = 20;
  const tileCount = canvas.width / gridSize;

  let snake = [
    { x: 10, y: 10 }
  ];

  let food = {
    x: 5,
    y: 5
  };

  let xVelocity = 0;
  let yVelocity = 0;

  let score = 0;

  let gameLoop;

  // DRAW GRID

  function drawGrid() {

    ctx.strokeStyle = 'rgba(255,255,255,0.08)';

    for (let i = 0; i < tileCount; i++) {

      ctx.beginPath();
      ctx.moveTo(i * gridSize, 0);
      ctx.lineTo(i * gridSize, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * gridSize);
      ctx.lineTo(canvas.width, i * gridSize);
      ctx.stroke();
    }
  }

  // DRAW SNAKE

  function drawSnake() {

    ctx.fillStyle = '#00ff9d';

    snake.forEach(segment => {

      ctx.fillRect(
        segment.x * gridSize,
        segment.y * gridSize,
        gridSize - 2,
        gridSize - 2
      );

    });
  }

  // DRAW FOOD

  function drawFood() {

    ctx.fillStyle = '#ff2ced';

    ctx.fillRect(
      food.x * gridSize,
      food.y * gridSize,
      gridSize - 2,
      gridSize - 2
    );
  }

  // MOVE SNAKE

  function moveSnake() {

    const head = {
      x: snake[0].x + xVelocity,
      y: snake[0].y + yVelocity
    };

    // WALL COLLISION

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= tileCount ||
      head.y >= tileCount
    ) {

      gameOver();
      return;
    }

    // SELF COLLISION

    if (
      snake.some(
        segment =>
          segment.x === head.x &&
          segment.y === head.y
      )
    ) {

      gameOver();
      return;
    }

    snake.unshift(head);

    // FOOD COLLISION

    if (
      head.x === food.x &&
      head.y === food.y
    ) {

      score += 10;
      scoreElement.textContent = score;

      food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };

    } else {

      snake.pop();
    }
  }

  // GAME OVER

  function gameOver() {

    clearInterval(gameLoop);

    alert(`GAME OVER! Your score: ${score}`);
  }

  // GAME STEP

  function gameStep() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();

    moveSnake();

    drawSnake();

    drawFood();
  }

  // KEY CONTROLS

  document.onkeydown = (e) => {

    switch(e.key) {

      case 'ArrowUp':

        if (yVelocity !== 1) {
          xVelocity = 0;
          yVelocity = -1;
        }

        break;

      case 'ArrowDown':

        if (yVelocity !== -1) {
          xVelocity = 0;
          yVelocity = 1;
        }

        break;

      case 'ArrowLeft':

        if (xVelocity !== 1) {
          xVelocity = -1;
          yVelocity = 0;
        }

        break;

      case 'ArrowRight':

        if (xVelocity !== -1) {
          xVelocity = 1;
          yVelocity = 0;
        }

        break;
    }
  };

  clearInterval(gameLoop);

  gameLoop = setInterval(gameStep, 100);
}
