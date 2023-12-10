// const apiKey = '1d5cb9487b50db9f810f217d59251cf8'; 
// const apiUrl ='https://api.themoviedb.org/3';
// const IMGPATH = 'https://image.tmdb.org/t/p/w500';
// const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie';

// const main = document.getElementById('main');
// const form = document.getElementById('form');
// const search = document.getElementById('search');
// showMovies(apiUrl);

// function showMovies(url) {
//   fetch(url)
//     .then((res) => res.json())
//     .then(function (data) {
//       console.log("data.results");
//       data.results.forEach((element) => {
//         const el = document.createElement('div');
//         const image = document.createElement('img'); // Change this line
//         const text = document.createElement('p');

//       text.innerHTML = `${element.title}`;
//       image.src = IMGPATH + element.poster_path;
//       el.appendChild(image);
//       el.appendChild(text);
//       main.appendChild(el);
//     });
//   });
// }

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   main.innerHTML = '';
//   const search = search.value;

//   if (searchTerm) {
//     showMovies(SEARCHAPI + searchTerm);
//     search.value = "";

//   }
// });