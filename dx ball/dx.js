const ball = document.getElementById("ball");
const grid = document.querySelector(".grid");
const bouncehit = new Audio('paddle.mp3');
const blockhit = new Audio('eat.mp3');
const over = new Audio('over.mp3');
const winplay = new Audio('win.mp3');
var paddle = document.getElementById("paddle");
var blocks = Array.from(document.querySelectorAll(".grid div"));

var balldirectionY = 1;
var balldirectionX = 1;


//moving the ball
function moveball(){
    var ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    //changing left and top
    ball.style.left = (ballLeft+(10*balldirectionX))+ "px";
    ball.style.top = (ballTop-(10*balldirectionY))+ "px";
}

//if all blocks removed
function win(){
    const allBlocksRemoved = blocks.every(block => block.classList.contains("remove"));

    if (allBlocksRemoved){
    winplay.play();
    clearInterval(valinterval);
    const result = document.getElementById("result");
    result.style.display = "block";
    grid.style.display = "none";
    const box = document.getElementById("box");
    box.style.display = "none";
}
else{
    console.log("nothing");
}
}

//on collision with walls
function changeDir(){
    var ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));

    if(ballTop < 0){
        balldirectionY = -balldirectionY;
    }
    else if(ballLeft < 0 || ballLeft > innerWidth){
        balldirectionX = -balldirectionX;
    }
}

//if hit ground
function gameover(){
    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    if(ballTop > innerHeight){
        over.play();
        clearInterval(valinterval);
        const result = document.getElementById("result");
        result.style.display = "block";
        grid.style.display = "none";
        const box = document.getElementById("box");
        box.style.display = "none";
    }
    else{
        console.log("nothing");
    }
}

//removing blocks with ball
function remove(){
    blocks.forEach((block)=>{
        var blockposition = block.getBoundingClientRect();
        var ballposition = ball.getBoundingClientRect();
        var removedblock = block.classList.contains("remove");
        if(blockposition.left < ballposition.right && blockposition.right > ballposition.left &&
            blockposition.top < ballposition.bottom && blockposition.bottom > ballposition.bottom
            && !removedblock){
                blockhit.play();
                block.style.visibility = "hidden";
                block.classList.add("remove");
                balldirectionY = -balldirectionY;
        }else{
            console.log("nothing");
        }
        win();
    });
}

//paddle control
window.addEventListener("mousemove", movePaddle);
function movePaddle(e){
    mousePosition ={
        x: e.clientX,
        y: e.clientY
    }
    if(mousePosition.x < innerWidth -140){
        paddle.style.left = (mousePosition.x + 0) + "px";
    }  else{
        console.log("nothing");
    }
}
//bounce on paddle
function paddlehit(){
    var paddleposition = paddle.getBoundingClientRect();
    var ballposition = ball.getBoundingClientRect();
    if(paddleposition.left < ballposition.right && paddleposition.right > ballposition.left
      && paddleposition.top < ballposition.bottom && paddleposition.bottom > ballposition.top){
        bouncehit.play();
        const relativePosition = (ballposition.left - paddleposition.left) / (paddleposition.width);
        balldirectionX = 2 * (relativePosition - 0.5);   
        balldirectionY = -balldirectionY;
    }
}
//run function
function start(){
    win();
    moveball();
    changeDir();
    remove();
    paddlehit();
    gameover();
}

const valinterval = setInterval(start,30);