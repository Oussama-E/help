let red = document.getElementById('red');
let orange = document.getElementById('orange');
let green = document.getElementById('green');
var fire; 
let minuter = 1000;

light();

function light(){
    fire = setInterval(redLight, minuter*4);
}

function redLight(){
    red.style.backgroundColor = "red";   
    orange.style.backgroundColor = "white";
    green.style.backgroundColor = "white";  
    clearInterval(fire); 
    fire = setInterval(orangeLight, minuter);
}

function orangeLight(){
    red.style.backgroundColor = "white"
    orange.style.backgroundColor = "orange";
    green.style.backgroundColor = "white";
    clearInterval(fire);
    fire = setInterval(greenLight, minuter);
}

function orangeLight2(){
    red.style.backgroundColor = "white"
    orange.style.backgroundColor = "orange";
    green.style.backgroundColor = "white";
    clearInterval(fire);
    fire = setInterval(redLight, minuter);
}

function greenLight(){
    red.style.backgroundColor = "white"
    orange.style.backgroundColor = "white";
    green.style.backgroundColor = "green";
    clearInterval(fire);
    fire = setInterval(orangeLight2, minuter);
}


