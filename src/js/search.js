import filmsTpl from '../templates/search-card.hbs';
import debounce from 'lodash.debounce';
import VideoApiService from './apiServiceSearch';
import MovieModal from './movieModal';

const themeSwitch = document.querySelector('.theme-switch');

const refs = {
  input: document.querySelector('[data-input]'),
  gallery: document.querySelector('.gallery-list'),
  main: document.querySelector('.main'), //-----------------убрать как появиться пагин
  errorMessage: document.querySelector('[data-error]'),
};

// Поиск по ключевому слову
const filmApiSearch = new VideoApiService();

refs.input.addEventListener(
  'input',
  debounce((e) => {
    onSearch(e);
  }, 1000)
);
filmApiSearch.page = 1;

function onSearch(e) {
  e.preventDefault();
  onClear();
  filmApiSearch.query = e.target.value;

  refs.main.classList.add('is-hidden'); //-----------------убрать как появиться пагин
  refs.errorMessage.classList.add('is-hidden');
  if (filmApiSearch.query === '') {
    refs.main.classList.remove('is-hidden'); //-----------------убрать как появиться пагин
    return;
  }

  filmApiSearch
    .insertGenresToSearch()
    .then((data) => {
      if (!data) {
        return;
      }
      if (data.length === 0) {
        onFetchError();
      }
      if (data.length < 20) {
        renderFilmsList(data);
        filmApiSearch.moviesArray = [...filmApiSearch.moviesArray].concat([
          ...data,
        ]);
        renderMoviesList(
          filmApiSearch.moviesArray.slice(
            filmApiSearch.pageDesktop,
            filmApiSearch.pageDesktop + 6
          )
        );
        modal();
      } else {
        renderFilmsList(data);
        filmApiSearch.moviesArray = [...filmApiSearch.moviesArray].concat([
          ...data,
        ]);
        renderMoviesList(
          filmApiSearch.moviesArray.slice(
            filmApiSearch.pageDesktop,
            filmApiSearch.pageDesktop + 6
          )
        );
        modal();
        fetchDataOfSearchFilms();
      }
    })
    .catch((err) => {
      onFetchError(err);
    });
}

function renderFilmsList(list) {
  const markUp = filmsTpl(list);
  refs.gallery.innerHTML = markUp;
}

function onClear() {
  refs.gallery.innerHTML = ' ';
}

function onFetchError() {
  refs.errorMessage.classList.remove('is-hidden');
}

function modal() {
  const galleryRefs = document.querySelectorAll('.gallery__list');
  galleryRefs.forEach((el) => {
    el.addEventListener('click', () => {
      themeSwitch.classList.add('visualy-hidden');
      fetch(
        `https://api.themoviedb.org/3/movie/${el.id}?api_key=0d09eb187785fad1be6a14878e771552&language=en-US`
      )
        .then((response) => response.json())
        .then((response) => {
          const info = new MovieModal(response);
          info.appendMarkup();
          info.getRefs();
          info.addEventListeners();
        });
    });
  });
}

//==============================
// const paginationBack = document.querySelector(
//   'button[data-action="back-search"]'
// );
// const paginationForward = document.querySelector(
//   'button[data-action="forward-search"]'
// );

// paginationBack.addEventListener('click', paginationBackHundler);
// paginationForward.addEventListener('click', paginationForwardHundler);

// function paginationBackHundler() {
//   if (filmApiSearch.pageDesktop >= 6) {
//     filmApiSearch.pageDesktop -= 6;
//     renderMoviesList(
//       filmApiSearch.moviesArray.slice(
//         filmApiSearch.pageDesktop,
//         filmApiSearch.pageDesktop + 6
//       )
//     );
//   }
// }
// function paginationForwardHundler() {
//   // finder.moviesArray = [...finder.moviesArray].concat([...data]);
//   filmApiSearch.pageDesktop += 6;
//   if (filmApiSearch.pageDesktop + 6 < filmApiSearch.moviesArray.length) {
//     filmApiSearch.page += 1;
//     // onSearch(e);
//   }
//   renderMoviesList(
//     filmApiSearch.moviesArray.slice(
//       filmApiSearch.pageDesktop,
//       filmApiSearch.pageDesktop + 6
//     )
//   );
// }

// //document.body.clientWidth
// window.addEventListener(
//   'resize',
//   function calculateElementsForOutput() {},
//   false
// );
// function calculateElementsForOutput() {}
