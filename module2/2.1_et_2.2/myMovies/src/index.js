import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import img1url from './img/Movie_TheMovie.png';
import img2url from './img/Movie2.png';

renderHomePage();

function renderHomePage(){
    const body = document.querySelector('body');
    const mainWrapper = document.querySelector('main');
    const h1 = document.createElement('h1');
    h1.innerHTML = 'MyMovies';
    const div1 = document.createElement('div');
    div1.className= 'film';
    const h2 = document.createElement('h2');
    h2.innerHTML = 'Title';
    const p = document.createElement('p');
    p.innerHTML = 'Director: Name of Director 1';
    const p1 = document.createElement('p');
    p1.innerHTML = 'Year: year';
    const img1 = document.createElement('img');
    img1.src = img1url;
    img1.style.maxWidth = '50%';
    img1.style.height = 'auto';
    div1.appendChild(h2);
    div1.appendChild(p);
    div1.appendChild(p1);
    div1.appendChild(img1);

    const div2 = document.createElement('div');
    div2.className= 'film';
    const h2div2 = document.createElement('h2');
    h2div2.innerHTML = 'Title';
    const pdiv2 = document.createElement('p');
    pdiv2.innerHTML = 'Director: Name of Director 1';
    const p1div2 = document.createElement('p');
    p1div2.innerHTML = 'Year: year';
    const img2 = document.createElement('img');
    img2.src = img2url;
    img2.style.maxWidth = '50%';
    img2.style.height = 'auto';
    div2.appendChild(h2div2);
    div2.appendChild(pdiv2);
    div2.appendChild(p1div2);
    div2.appendChild(img2);

    mainWrapper.appendChild(h1);
    mainWrapper.appendChild(div1);
    mainWrapper.appendChild(div2);
    body.appendChild(mainWrapper);
}