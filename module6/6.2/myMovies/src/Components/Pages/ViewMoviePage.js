import { clearPage } from '../../utils/render';

const ViewMoviePage= async () => {
    try{
        clearPage();
        const movies = await getAllMovies();
        renderViewMoviePage();
        renderTab(movies);
    }
    catch(err){
        console.error('ViewMoviePage::error: ', err);
    }
};

async function getAllMovies(){
    try{
        const response = await fetch('/api/movies');
        if(!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
        const table = await response.json();
        return table;
    }
    catch(err){
        console.error('getAllMovies::error: ', err);
        throw err;
    }
}

function renderViewMoviePage(){
    const main = document.querySelector('main');
    const table = document.createElement('table');
    table.className = 'table';
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
    const th4 = document.createElement('th');
    th4.scope = 'col';
    th4.innerHTML = `Opérations`;
    const th5 = document.createElement('th');
    th5.scope = 'col';
    th5.innerHTML = `lien`;

    tr.appendChild(th1);
    tr.appendChild(th5);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    table.appendChild(tr);
    main.appendChild(table);
}

async function renderTab(moviesList){
    const table = document.querySelector('table');
    moviesList?.forEach(movies =>{
        const ligne = document.createElement('tr');
        const td = document.createElement('td');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        td.contentEditable = true;
        td1.contentEditable = true;
        td2.contentEditable = true;
        td3.contentEditable = true;
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `DELETE`;
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.id = 'del';
        deleteBtn.style = `margin: 10px;`;
        deleteBtn.setAttribute('data-id', `${movies.id}`);
        const saveBtn = document.createElement('button');
        saveBtn.innerHTML = `SAVE`;
        saveBtn.className = 'btn btn-success';
        saveBtn.id = 'save';
        saveBtn.setAttribute('data-id', `${movies.id}`);
        td.innerHTML = `${movies.title}`;
        td3.innerHTML = `<li><a href="${movies.link}">${movies.link}</a></li>`;
        td1.innerHTML = `${movies.duration}`;
        td2.innerHTML = `${movies.budget}`;
        ligne.appendChild(td);
        ligne.appendChild(td3);
        ligne.appendChild(td1);
        ligne.appendChild(td2);
        ligne.appendChild(deleteBtn);
        ligne.appendChild(saveBtn);
        table.appendChild(ligne);
    });

    const btnD = document.querySelectorAll('#del');
    btnD.forEach(btn => {
            btn.addEventListener('click', (e) => {
            const idNumber = e.target.dataset.id;
            deleteMovie(idNumber);
        });
    });
    const btnS = document.querySelectorAll('#save');
    btnS.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idNumber = e.target.dataset.id;
            const ligne = e.target.parentElement;
            const title = ligne.children[0].textContent;
            const duration = ligne.children[2].textContent;
            const budget = ligne.children[3].textContent;
            const link = ligne.children[1].children[0].textContent;
            saveMovie(idNumber, title, link, duration, budget);
        });
    });
}

async function deleteMovie(id){
    console.log(id);
    const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
    try {
        const response = await fetch(`/api/movies/${id}`, options);
        if(!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
        const deletedMovie = await response.json();
        document.location.reload();
        return deletedMovie;
    } catch (err) {
        console.error('deleteMovie::error: ', err);
        throw err;
    }
    
}

async function saveMovie(id, title, link, duration, budget){
    console.log('ligne : ', id, title, link, duration, budget);
    const options = {
        method: 'PATCH',
        body: JSON.stringify({
          title,
          duration,
          budget,
          link,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      try {
        const response = await fetch(`/api/movies/${id}`, options);
        if(!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
        const movieUp = await response.json();
        document.location.reload();
        return movieUp;
      } catch (err) {
        console.error('deleteMovie::error: ', err);
        throw err;
      } 
}

export default ViewMoviePage