let c = 0;
let button = document.getElementById("button");
let cmp = document.getElementById("compteur");
let message = document.getElementById("message");
button.addEventListener('click', compteur);



function compteur(){
    c++;
    cmp.innerHTML = c;
    if(c>=5 && c<=9){
        message.innerHTML = "Bravo, bel échauffement !";
    }
    if(c>=10){
        message.innerHTML = "Vous êtes passé maître en l'art du clic !";
    }
}