import filmsTpl from '../templates/search-card.hbs';
import debounce from 'lodash.debounce';
import VideoApiService from './apiServiceSearch';
import MovieModal from './movieModal';

const themeSwitch = document.querySelector('.theme-switch')

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
  debounce(e => {
    onSearch(e);
  }, 1000),
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
    .then(data => {
      if (!data) {
        return;
      } else {
        if (data.length === 0) {
          onFetchError();
        } else {
          if (data.length < 20) {
            renderFilmsList(data);
            const galleryRefs = document.querySelectorAll('.gallery__list');
            galleryRefs.forEach(el => {
              el.addEventListener('click', () => {
                themeSwitch.classList.add('visualy-hidden');
                fetch(
                  `https://api.themoviedb.org/3/movie/${el.id}?api_key=0d09eb187785fad1be6a14878e771552&language=en-US`,
                )
                  .then(response => response.json())
                  .then(response => {
                    const info = new MovieModal(response);
                    info.appendMarkup();
                    info.getRefs();
                    info.addEventListeners();
                  });
              });
            });
          } else {
            renderFilmsList(data);
            const galleryRefs = document.querySelectorAll('.gallery__list');
            galleryRefs.forEach(el => {
              el.addEventListener('click', () => {
                themeSwitch.classList.add('visualy-hidden');
                fetch(
                  `https://api.themoviedb.org/3/movie/${el.id}?api_key=0d09eb187785fad1be6a14878e771552&language=en-US`,
                )
                  .then(response => response.json())
                  .then(response => {
                    const info = new MovieModal(response);
                    info.appendMarkup();
                    info.getRefs();
                    info.addEventListeners();
                  });
              });
            });
            fetchDataOfSearchFilms();
          }
        }
      }
    })
    .catch(err => {
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
