var hole = document.querySelectorAll('#hole, #hole2');
var block = document.querySelectorAll('#block, #block2');
var character = document.getElementById('character');
var jumping = 0;
var counter = 0;

hole.addEventListener('animationiteration', () => {
    var random = Math.random()*3;
    var top = (random*100)+150;
    hole.style.top = -(top) + "px";
    counter++;
});
document.write(counter);
setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
    if(jumping==0){
        character.style.top = (characterTop+3)+"px";
    }
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue('top'));
    var cTop = -(600-characterTop);
    if(characterTop>560 || (blockLeft<60) && (blockLeft>-60) && ((cTop<holeTop)||(cTop>holeTop+120))){
        alert("Game Over. Score: "+counter);
        character.style.top = 100 + "px";
        counter=0;
    }
},10);

function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
        character.style.top = (characterTop-5)+"px";
        if((character>6) && (counter<15)){
            character.style.top = (characterTop-5) + "px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);
}