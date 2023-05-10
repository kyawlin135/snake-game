const playBoard = document.querySelector('.playboard'),
scoreTag = document.querySelector('.score'),
hightScoreTag = document.querySelector('.hightscore')

let foodX, foodY;

let addsnakeX = 0, addsnakeY = 0;
let snakeX = 5, snakeY = 5;
let intervalId;

let score = 0, hightScore = localStorage.getItem('hightScore');

hightScoreTag.textContent = `Hight Score: ${hightScore}`;

const gameOverFun = () => {
    clearInterval(intervalId);
    alert('game over');
    location.reload()
}

const snakeBody = [
   
]

const changeFoodPosition = () => {
   foodX = Math.floor(Math.random() * 30);
   foodY = Math.floor(Math.random() * 30);

   if(foodX < 2 || foodX > 29 || foodY < 2 || foodY > 29){
        changeFoodPosition()
   }

   for(let i = 0; i < snakeBody.length; i++){
    if(snakeBody[i][0] === foodX || snakeBody[i][1] === foodY){
        changeFoodPosition();
    }
   }
}

const initGame = () => {
   snakeX += addsnakeX;
    snakeY += addsnakeY;

    snakeBody[0] = [snakeX, snakeY]

    for(let i = 1; i < snakeBody.length; i++){
        if(snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]){
           gameOverFun()
        }
    }

    if(snakeBody[0][0] === foodX && snakeBody[0][1] === foodY){
        console.log('hey')
        changeFoodPosition()
        snakeBody.push([snakeX, snakeY]);
        score++;
        scoreTag.textContent = `Score: ${score}`;

        hightScore = hightScore < score ? score: hightScore;
        localStorage.setItem('hightScore', hightScore);

        hightScoreTag.textContent = `Hight Score: ${localStorage.getItem('hightScore')}`
    }


    let htmlMakeup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    for(let i = 0; i < snakeBody.length; i++){
        htmlMakeup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }
    
    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1]
    }
    playBoard.innerHTML = htmlMakeup;

    if(snakeBody[0][0] < 1 || snakeBody[0][1] < 1 || snakeBody[0][0] > 30 || snakeBody[0][1] > 30){
        gameOverFun()
    }
}

const changeDirection = (e) => {
   if(e.key === "ArrowUp" && addsnakeY !== 1 || e.key === "w" && addsnakeY !== 1 ){
      addsnakeX = 0;
      addsnakeY = -1;
   }else if(e.key === "ArrowDown" && addsnakeY !== -1 || e.key === "s" && addsnakeY !== -1 ){
      addsnakeY = 1;
      addsnakeX = 0;
   }else if(e.key === "ArrowLeft" && addsnakeX !== 1 || e.key === "a" && addsnakeX !== 1 ){
      addsnakeX = -1;
      addsnakeY = 0;
   }else if(e.key === "ArrowRight" && addsnakeX !== -1 || e.key === "d" && addsnakeX !== -1 ){
      addsnakeX = 1;
      addsnakeY = 0;
   }
}

changeFoodPosition();

intervalId = setInterval(initGame, 125);

document.addEventListener('keyup', changeDirection)