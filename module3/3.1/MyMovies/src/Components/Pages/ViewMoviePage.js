import { clearPage } from '../../utils/render';
import { readAllMovies } from '../../movies';

const ViewMoviePage= () => {
    clearPage();
    renderViewMoviePage();
};

function renderViewMoviePage(){
    const main = document.querySelector('main');
    const table = readAllMovies();
    main.appendChild(table);
}

export default ViewMoviePage