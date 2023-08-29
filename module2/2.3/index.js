
let form = document.getElementById('form');

form.addEventListener('submit', function(e){
    e.preventDefault();
    let input1 = document.getElementById('input1').value;
    let input2 = document.getElementById('input2').value;
    let input3 = document.getElementById('input3').value;

    const t = createTable(input1, input2, input3);
    renderTab(t);

    console.log("Number of lines:", input1);
    console.log("Number of columns:", input2);
    console.log("Initial string:", input3);
});

function renderTab(tab){
    const body = document.querySelector('body');
    const div = document.createElement('div');
    const tableau = document.createElement('table');
    for (let i = 0; i < tab.length; i++) {
        let row = `<tr>`;
        for (let j = 0; j < tab[i].length; j++) {
            row += `<td>${tab[i][j]}</td>`;
        }
        row+='</tr>';
        tableau.innerHTML += row;
    }
    div.appendChild(tableau);
    body.appendChild(div);
}

function createTable(nl, nc, string){
    let tab=[];
    for (let i = 0; i < nl; i++) {
        tab[i] = [];
        for (let j = 0; j < nc; j++) {
            tab[i][j] = string + '[' + i + ']' + '[' + j + ']';
        }
    }
    return tab;
}