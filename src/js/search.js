import filmsTpl from '../templates/search-card.hbs';
import debounce from 'lodash.debounce';
import VideoApiService from './apiServiceSearch';

const refs = {
  input: document.querySelector('[data-input]'),
  gallery: document.querySelector('.gallery-list'),
  main: document.querySelector('.main'), //-----------------убрать как появиться пагин
  errorMessage: document.querySelector('[data-error]'),
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
  refs.errorMessage.classList.add('is-hidden');
  if (filmApiService.query === '') {
    refs.main.classList.remove('is-hidden'); //-----------------убрать как появиться пагин
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
            renderFilmsList(data);
            onClickTheme();
          } else {
            renderFilmsList(data);
            onClickTheme();
            fetchDataOfSearchFilms();
          }
        }
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
