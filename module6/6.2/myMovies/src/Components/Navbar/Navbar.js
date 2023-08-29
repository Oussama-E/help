// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';

const Navbar = () => {
  renderNavbar();
};

function renderNavbar() {
  const navbar = document.querySelector('#navbarWrapper');
  navbar.innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-light bg-info">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">myMovies</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" data-uri="/">Home</a>
              </li>
              <li id="viewMoviePageItem" class="nav-item">
                <a class="nav-link" href="#" data-uri="/viewMoviePage">Movies</a>
              </li>   
              <li id="addMoviePageItem" class="nav-item">
              <a class="nav-link" href="#" data-uri="/addMoviePage">Add a movie</a>
              </li>        
            </ul>
          </div>
        </div>
      </nav>
  `;
}



export default Navbar;
