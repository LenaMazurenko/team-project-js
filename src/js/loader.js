 export function loader () {
  setTimeout(function () {
    const preloader = document.getElementById('page-preloader');
    if (!preloader.classList.contains('done')) {
      preloader.classList.add('done');
    }
  }, 1000);
};
document.body.onload = loader;






















 
// function getData() {
//   hide.classList.add('loader');
//   return fetch(URL='https://api.themoviedb.org/3')
//     .then()
//     .catch()
//     .finally(() => {
//       hide.classList.remove('loader');
//     });
// }