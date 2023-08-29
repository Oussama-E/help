const HomePage = async () => {
  const main = document.querySelector('main');
  main.innerHTML = 'Jokes';
  const theJoke = await getAJoke();
  console.log('theJoke= ', theJoke);
  const p1 = document.createElement('p');
  p1.innerHTML = `${theJoke.category}`;
  const p2 = document.createElement('p');
  p2.innerHTML = `${theJoke.joke}`;
  main.appendChild(p1);
  main.appendChild(p2);
};

async function getAJoke(){
  try{
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
    console.log('response= ',response);
    if(!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    const joke = await response.json();
    return joke;
  }
  catch(err){
    console.error('getAJoke::error: ', err);
    throw err;
  }
  
}



export default HomePage;
