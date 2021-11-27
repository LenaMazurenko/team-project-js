import filmsTpl from '../templates/main-cards.hbs';
import debounce from 'lodash.debounce';
import VideoApiService from './apiServiceSearch';
// import spinner from './spinner';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '0d09eb187785fad1be6a14878e771552';

const refs = {
  input: document.querySelector('[data-input]'),
  gallery: document.querySelector('.gallery-list'),
  main: document.querySelector('.main'), //-----------------убрать как появиться пагин
  // errorMessage: document.querySelector('[data-error]'),
  // pagination: document.querySelector('.pagination__container'),
};

// Поиск по ключевому слову
const filmApiService = new VideoApiService();

refs.input.addEventListener(
  'input',
  debounce((e) => {
    onSearch(e);
  }, 1000)
);

function onSearch(e) {
  e.preventDefault();
  onClear();

  filmApiService.query = e.target.value;
  filmApiService.pageNum = 1;
  refs.main.classList.add('is-hidden'); //-----------------убрать как появиться пагин
  // refs.pagination.classList.remove('is-hidden');
  // refs.errorMessage.classList.add('is-hidden');
  if (filmApiService.query === '') {
    refs.main.classList.remove('is-hidden'); //-----------------убрать как появиться пагин
    // refs.pagination.classList.add('is-hidden');
    return;
  }

  filmApiService
    .insertGenresToSearch()
    .then((data) => {
      if (!data) {
        return;
      } else {
        if (data.length === 0) {
          onFetchError();
        } else {
          if (data.length < 20) {
            // refs.pagination.classList.add('is-hidden');
            renderFilmsList(data);
            // onClickTheme();
          } else {
            renderFilmsList(data);
            // onClickTheme();
            fetchDataOfSearchFilms();
          }
        }
      }
    })
    .catch((err) => {
      // onFetchError(err);
    });
}

function renderFilmsList(list) {
  const markUp = filmsTpl(list);
  refs.gallery.innerHTML = markUp;
}

function onClear() {
  refs.gallery.innerHTML = ' ';
}

// function onFetchError() {
//   refs.errorMessage.classList.remove('is-hidden');
// }

// Pagination-----------------------------------------

// function fetchSearchFilmsByPage(page) {
//   filmApiService.pageNum = page;

//   return filmApiService.insertGenresToSearch();
// }

// function fetchDataOfSearchFilms() {
//   filmApiService.fetchFilmsPagesQ().then((results) => {
//     createPagination(results.total_pages, results.results, displayListQ);
//   });
// }

// function displayListQ(wrapper, page) {
//   wrapper.innerHTML = '';
//   fetchSearchFilmsByPage(page).then(renderFilmsList);
// }

//Spiner===================================================
// const spinnerRef = document.querySelector('.preloader');

// const spinner = {
//   show() {
//     spinnerRef.classList.remove('is-hidden');
//   },
//   hide() {
//     setTimeout(() => {
//       spinnerRef.classList.add('is-hidden');
//     }, 550);
//   },
// };
