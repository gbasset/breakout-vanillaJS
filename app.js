const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const rayonBall = 10, barHeight = 10, barWidth = 75;
const getScore = document.querySelector('.score');
const message = document.querySelector('#message');
let x = canvas.width / 2, y = canvas.height - 30,
  nbCol = 8, nbRow = 6, widthBrick = 80, heightbrick = 20, fin = false, vitesseX = 2
  , vitesseY = -5, barX = (canvas.width - barWidth) / 2, score = 0;
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, rayonBall, 0, Math.PI * 2);
  ctx.fillStyle = '#fb2f1d';
  ctx.fill();
  ctx.closePath;
}
// drawBall()
let lunchChron = setInterval(() => {
  chronoForSessionGlobal()
}, 1000);
function drawBar() {
  ctx.beginPath();
  ctx.rect(barX, canvas.height - barHeight - 2, barWidth, barHeight);
  ctx.fillStyle = '#fb2f1d';
  ctx.fill();
  ctx.closePath();
}
// drawBar();

// arrays with all bricks
const bricks = [];
for (let index = 0; index < nbRow; index++) {
  bricks[index] = [];
  for (let j = 0; j < nbCol; j++) {
    bricks[index][j] = { x: 0, y: 0, status: 1 }
  }
}


function drawBricks() {

  for (let index = 0; index < nbRow; index++) {
    for (let j = 0; j < nbCol; j++) {
      if (bricks[index][j].status === 1) {
        const isEven = index % 2 == 0 ? true : false
        // 75 * 8 + 10 * 8 +35 = 750
        let brickX = (j * (widthBrick + 10) + 35);
        let brickY = (index * (heightbrick + 10) + 30);
        bricks[index][j].x = brickX;
        bricks[index][j].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, widthBrick, heightbrick);
        if (isEven) {
          ctx.fillStyle = '#6585';
        } else {
          ctx.fillStyle = '#0185';
        }
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function dessine() {
  if (fin === false) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawBar();
    deteckColision();
    // width
    if (x + vitesseX > canvas.width - rayonBall || x + vitesseX < rayonBall) {
      vitesseX = -vitesseX;
    }
    // for the ball on top
    if (y + vitesseY < rayonBall) {
      vitesseY = - vitesseY;
    }
    // for the bottom 
    if (y + vitesseY > canvas.height - rayonBall) {
      // intervall 0-75
      if (x > barX && x < barX + barWidth) {
        vitesseX = vitesseX + 0.1;
        vitesseY = vitesseY + 0.1
        vitesseY = -vitesseY;
      } else {
        fin = true;
        getScore.innerHTML = "";
        message.innerHTML = `Perdu ! Le score est de ${score} <br> Clique sur le casse-brique, ou tape sur la touche entrée pour recommencer une autre partie </br> `;
        message.classList.add('message', 'red');
        clearInterval(lunchChron)
      }
    }
    x += vitesseX;
    y += vitesseY;
    requestAnimationFrame(dessine)
  }
}

// bar mouvments

document.addEventListener('mousemove', mouseIsMove);
function mouseIsMove(evt) {
  // evt.clientX =  de la gauche jusqu'à la souris
  // canvas.offsetLeft = décalage par rapport à la gauche
  let posXBarCanvas = evt.clientX - canvas.offsetLeft;
  if (posXBarCanvas > 35 && posXBarCanvas < canvas.width - 35) {
    barX = posXBarCanvas - barWidth / 2;
  }
}
window.addEventListener('keydown', handleKeyBoardEvent);
function handleKeyBoardEvent(evt) {

  console.log(evt.keyCode);
  // if user press escape
  console.log(evt.keyCode);
  if (evt.keyCode === 37) {
    let newPosition = barX - barWidth;
    console.log("cal", canvas.width - 35)
    if (newPosition > -44) {
      barX = newPosition;
    }
  }
  if (evt.keyCode === 39) {
    let newPosition = barX + barWidth;
    console.log("cal", canvas.width - 35)
    if (newPosition <= canvas.width - 35) {
      barX = newPosition;
    }
  }


}
function deteckColision() {
  for (let i = 0; i < nbRow; i++) {
    for (let j = 0; j < nbCol; j++) {
      let b = bricks[i][j];
      if (b.status === 1) {
        if (x > b.x && x < b.x + widthBrick && y > b.y && y < b.y + heightbrick) {
          vitesseY = -vitesseY;
          b.status = 0;
          score++;
          getScore.innerHTML = `Score : ${score}`;
          if (score === nbCol * nbRow) {
            getScore.innerHTML = ``;
            message.innerHTML = `Vous avez gagné ! le score est de ${score} <br> Clique sur le casse-brique , ou tape sur la touche entrée pour recommencer une autre partie </br> `;
            message.classList.add('message', 'red');
            clearInterval(lunchChron)
            fin = true;
          }
        }
      }
    }
  }
}
let Realsec = 0
let sec = 0
let Realmin = 0
let min = 0
function chronoForSessionGlobal() {
  Realsec += 1
  sec = Realsec
  if (Realsec < 10) {
    sec = "0" + sec
  }
  if (Realsec > 59) {
    Realmin += 1
    sec = 0
    sec = "0" + sec
    Realsec = 0
  }
  if (Realmin < 10) {
    min = "0" + Realmin
  }
  else {
    min = Realmin
  }
  document.querySelector(".chronotime").innerHTML = "Temps de jeux : " + min + ":" + sec
}

canvas.addEventListener('click', () => {
  if (fin === true) {
    fin = false;
    document.location.reload();
  }
})
document.addEventListener('keydown', (e) => {
  if (fin === true && e.keyCode === 13
  ) {
    fin = false;
    document.location.reload();
  }
})

dessine();
console.log('okopp')