
let grid = document.querySelector(".grid")
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay")
let left = document.querySelector(".left")
let bottom = document.querySelector(".bottom")
let right = document.querySelector(".right")
let up = document.querySelector(".top")
let width = 20;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;
let dead = new Audio();
let eat = new Audio();
let movements = new Audio();
const background = new Image();

eat.src = 'audios/eat.mp3';
dead.src = 'audios/dead.mp3';
movements.src = 'audios/movements.mp3';
background.src = 'img/gramado.jpg';

document.addEventListener("DOMContentLoaded",function(){
    document.addEventListener("keydown",control);
    createBoard();
    startGame();
    playAgain.addEventListener("click", replay);
});

var sound = document.getElementById("movesAudio");

    function playAudio(){
        sound.play();
    }


var sound2 = document.getElementById("eatAudio");

    function playAudio2(){
        sound2.play();
    }

var sound3 = document.getElementById("deadAudio");

    function playAudio3(){
        sound3.play();
    }
// createboard function

function createBoard(){
    popup.style.display = "none";
    for(let i=0;i<100;i++){
        let div =document.createElement("div");
        grid.appendChild(div)
    }
}

//  Trabalhando com as setas de direção para realizar os movimentos da cobra;

document.addEventListener("keydown", function(event) {
    event.preventDefault();

    const key = event.key;

    switch (key) { 
      case "ArrowLeft":
        direction = -1;
        movesAudio.play();
        break;
      case "ArrowRight":
        direction= 1;
        movesAudio.play();
        break;
      case "ArrowUp":
        direction = -width;
        movesAudio.play();
        break;
      case "ArrowDown":
        direction = +width;
        movesAudio.play();
        break;
    }
  });

// startGame function

function startGame(){
    let squares = document.querySelectorAll(".grid div");
    randomApple(squares);

    // randomApple
    direction = 1
    scoreDisplay.innerHTML = score
    intervalTime = 1000
    currentSnake = [2, 1, 0]
    currentIndex = 0
    currentSnake.forEach(index => squares [index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime)
}

function moveOutcome(){
    let squares = document.querySelectorAll(".grid div")
    if(checkForHits(squares)){
        alert("Você bateu em algo")
        popup.style.display="flex"
        return clearInterval(interval)
    } else{
        moveSnake(squares)
    }
}

function moveSnake(squares){
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    // movement ends here
    eatApple(squares,tail);
    squares[currentSnake[0]].classList.add("snake");
}

function checkForHits(squares){ // Aqui foi incluso o efeito sonoro de quando acaba o jogo
    if(
    (currentSnake[0] + width >= (width*width) && direction === width) ||
    (currentSnake[0] % width === width -1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width <= 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
    ){
        deadAudio.play();
        return true
    } else{
        return false
    }
}

function eatApple(squares, tail){ // Aqui está incluso o efeito sonoro de comer
    if (squares[currentSnake[0]].classList.contains("apple")){
        squares[currentSnake[0]].classList.remove("apple")
        squares[tail].classList.add("snake")
        currentSnake.push(tail)
        randomApple(squares)
        eatAudio.play();
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcome, intervalTime)
    }
}

function randomApple(squares){
    do{
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains("snake"))
        squares[appleIndex].classList.add("apple")
}

function control(e, movesAudio){ // Aqui estão inclusos os sons de movimento
	if (e.keycode===39){
        direction= 1;
        playAudio(movesAudio);
	}else if (e.keycode===38){ 
		direction = -width; //if we press the up arrow, the snake will go ten divs up
        playAudio(movesAudio);
	}else if (e.keycode===37){ 
		direction = -1; // left, the snake will go left one div
        playAudio(movesAudio);
	}else if (e.keycode===40){
		direction = +width; // down the snake head will instantly appear 10 divs below from the current div 
        playAudio(movesAudio);
	}
} 

	up.addEventListener("click",()=>direction= -width ) 
	bottom.addEventListener("click",()=>direction= +width ) 
	left.addEventListener("click",()=>direction= -1 ) 
	right.addEventListener("click",()=>direction= 1 )

function replay() {
    grid.innerHTML=""
    createBoard()
    startGame()
    popup.style.display = "none";
}

