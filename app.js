//Game constants and variables
const board=document.getElementById('gameBoard');
const gameInstruction=document.getElementById('gameDescription');
const slogo=document.getElementById('logo');
const Score=document.getElementById('score');
const highScoreText=document.getElementById('highScore');
const left=document.getElementById('left');
const up=document.getElementById('up');
const right=document.getElementById('right');
const down=document.getElementById('down');
// const start=document.getElementsById('start');


function mydirup()
{
    direction='up';
}

function mydirdown()
{
    direction='down';
}

function mydirleft()
{
    direction='left';
}

function mydirright()
{
    direction='right';
}
function mydirstart()
{
    startGame();
    gameTheme.play();
    gameTheme.loop=true;
}
let snake=[{
    x:10,
    y:10
}];
const gridSize=20;
let highScore=0;
let direction='right';
let food= generatefood();
let gameInterval;
let gameSpeed=300;
let gameStarted= false;
const foodSound= new Audio('food.mp3');
const gameOverSound= new Audio('gameover.mp3');
const moveSound= new Audio('move.mp3');
const musicSound= new Audio('music.mp3');
const gameSound = new Audio('gameMusic.mp3')
const gameTheme = new Audio('gametheme.mp3');

//Draw game map, snake, board
function draw()
{ 
    board.innerHTML= '';
    drawSnake();
    drawFood();
    updateScore();
    
}

//Draw snake
function drawSnake()
{
  snake.forEach((segment)=>{
    const snakeElement= createElement('div', 'snake');
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}
function setPosition(element, position)
{
    element.style.gridColumn=position.x;
    element.style.gridRow=position.y;
}

//D
function createElement(tag,className)
{
    const element=document.createElement(tag);
    element.className=className;
    return element;
}

function drawFood()
{
    if(gameStarted){
    const foodElement= createElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}
}

function generatefood()
{
    let x=Math.floor((Math.random()*gridSize)+1);
    let y=Math.floor((Math.random()*gridSize)+1);
    return {x,y};
}
  
function move()
{
    const head={...snake[0]};
    switch (direction) {
      
        case 'up':
            head.y--;
            break;
         case 'down':
            head.y++;
            break;
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
    }
    snake.unshift(head);
   
    if(head.x===food.x && head.y===food.y)
    {
        food=generatefood();
        foodSound.play();
        increaseSpeed();
        clearInterval(gameInterval);
        gameInterval=setInterval(()=>{
            move();
            checkCollision();
            draw();
        },gameSpeed);
    }
    else{
        snake.pop();
    }
}
 function startGame()  
{
    gameStarted = true;
    gameInstruction.style.display='none';
    slogo.style.display='none';
    gameInterval= setInterval(()=>{
                    move();
                    checkCollision();
                    draw();
                },gameSpeed);

}
//adding event listener
function handleEventKey(event)
{
    if(
        (!gameStarted && event.key==='Space') ||
        (!gameStarted && event.key===' ')
     )
     {
        startGame();
        // gameSound.play();
        // gameSound.loop=true;
        gameTheme.play();
        gameTheme.loop=true;

     }
     else{
        switch (event.key) {
            case 'ArrowUp':
                direction='up';
                break;
        
            case 'ArrowDown':
                direction='down';
                break;
        
            case 'ArrowRight':
                direction='right';
                break;
        
            case 'ArrowLeft':
                direction='left';
                break;
        }
     }
    
}
document.addEventListener('keydown', handleEventKey);
function increaseSpeed()
{
   
    if(gameSpeed > 150)
    {
        gameSpeed -= 5;
    }
    else if(gameSpeed > 100)
    {
        gameSpeed -=3;
    }
    else if(gameSpeed > 50)
    {
        gameSpeed -=2;
    }
    else if(gameSpeed > 25)
    {
        gameSpeed -=1;
    }
}
   
function checkCollision()
{
    const head = snake[0];
    if(head.x<1 || head.x>gridSize || head.y<1 || head.y>gridSize){
        gameOverSound.play();
        restartGame();
    }
    for(let i=1;i<snake.length;i++)
    {
        if(head.x === snake[i].x && head.y === snake[i].y){
            gameOverSound.play();
            restartGame();
        }
    }
}
 function restartGame()
 {
    updateHighScore();
     gameTheme.pause();
    stopGame();
     snake=[{
        x:10,
        y:10
     }];
     food=generatefood();
     direction='right';
     gameSpeed= 200;
     updateScore();
 }
 function updateScore(){
    const currentScore = snake.length-1;
    Score.textContent = currentScore.toString().padStart(3, '0');
 }
 function stopGame()
 {
    // gameTheme.play();
    clearInterval(gameInterval);
    gameStarted= false;
    gameInstruction.style.display='block';
    slogo.style.display='block';
 }
 function updateHighScore()
 {
    const currentScore=snake.length-1;
    if(currentScore > highScore)
    {
        highScore=currentScore;
        highScoreText.textContent = currentScore.toString().padStart(3, '0');
    }
     highScoreText.style.display='block';
 }