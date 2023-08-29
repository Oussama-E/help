import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

const AddMoviePage = () => {
  clearPage();
  renderAddMoviePage();
}

function renderAddMoviePage(){
    const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  form.innerHTML += `<form>
  <div class="form-group row">
    <label for="input1" class="col-sm-2 col-form-label">Title</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="input1" placeholder="Title">
    </div>
  </div>
  <div class="form-group row">
    <label for="input2" class="col-sm-2 col-form-label">Duration</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="input2" placeholder="00:00:00">
    </div>
  </div>
  <div class="form-group row">
    <label for="input3" class="col-sm-2 col-form-label">Budget</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="input3" placeholder="100">
    </div>
  </div>
  <div class="form-group row">
    <label for="input4" class="col-sm-2 col-form-label">Link</label>
    <div class="col-sm-10">
      <input type="url" class="form-control" id="input4" placeholder="">
    </div>
  </div>
  <div class="form-group row">
    <div class="col-sm-10">
      <button type="submit" class="btn btn-success">Add</button>
    </div>
  </div>
</form>`
  main.appendChild(form);

  form.addEventListener('submit', addOneMovie);
}

async function addOneMovie(e){
  e.preventDefault();
  const title = document.getElementById('input1').value;
  const duration = document.getElementById('input2').value;
  const budget = document.getElementById('input3').value;
  const link = document.getElementById('input4').value;

  const options = {
    method: 'POST',
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

  const response = await fetch('/api/movies', options);
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  const newMovie = await response.json();
  console.log('New movie added: ', newMovie);
  Navigate('/viewMoviePage');
}

export default AddMoviePage