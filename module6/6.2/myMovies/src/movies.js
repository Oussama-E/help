const films = [];
films.push({
  title: 'Harry...',
  duration: 120,
  budget: 111,
  link: 'https://amazing-javascript.world',
});

function addOneMovie(t, d, b, l){
    films.push({
        title: t,
        duration: d,
        budget: b,
        link: l,
    });
}

export default addOneMovie ;