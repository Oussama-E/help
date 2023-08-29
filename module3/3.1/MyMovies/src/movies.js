const films = [];
films.push({
  title: 'Harry...',
  duration: 120,
  budget: 111,
  link: 'https://amazing-javascript.world',
});

function readAllMovies(){ 
    const table = document.createElement('table');
    table.className = 'table';
    const thead = document.createElement('thead');
    thead.className = 'thead-dark';
    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    th1.scope = 'col';
    th1.innerHTML = `Title`;
    const th2 = document.createElement('th');
    th2.scope = 'col';
    th2.innerHTML = `Duration(min)`;
    const th3 = document.createElement('th');
    th3.scope = 'col';
    th3.innerHTML = `Budget(million€)`;
    films.forEach(movie =>{
        const ligne = document.createElement('tr');
        const td = document.createElement('td');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        td.innerHTML = `<li><a href="${movie.link}">${movie.title}</a></li>`;
        td1.innerHTML = `${movie.duration}`;
        td2.innerHTML = `${movie.budget}`;
        ligne.appendChild(td);
        ligne.appendChild(td1);
        ligne.appendChild(td2);
        table.appendChild(ligne);
    });

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    thead.appendChild(tr);
    table.appendChild(thead);

    return table;
}

function addOneMovie(t, d, b, l){
    films.push({
        title: t,
        duration: d,
        budget: b,
        link: l,
    });
}

export { readAllMovies, addOneMovie } ;