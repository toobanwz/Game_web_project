var character = document.getElementById('character');
var block = document.getElementById('block');
function jump(){
    if(character.classList != "animate"){
        character.classList.add("animate");
    }
    setTimeout(function(){
        character.classList.remove("animate");
    }, 400);
}
var checklost = setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("right"));
    if(blockLeft>1050 && blockLeft<1110 && characterTop<=60){
        block.style.animation ="none";
        block.style.display ="none";
        alert("YOU LOSE!");
    }
},10);