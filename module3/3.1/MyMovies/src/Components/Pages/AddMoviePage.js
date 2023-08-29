import { clearPage } from '../../utils/render';
import { addOneMovie } from '../../movies';
import ViewMoviePage from './ViewMoviePage';


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
  
  

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input1 = document.getElementById('input1').value;
      const input2 = document.getElementById('input2').value;
      const input3 = document.getElementById('input3').value;
      const input4 = document.getElementById('input4').value;
      addOneMovie(input1, input2, input3, input4);
      ViewMoviePage();
    });
}


export default AddMoviePage