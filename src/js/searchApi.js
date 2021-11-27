import getRefs from './getRefs';
import filmsTpl from '../templates/search-films-gallery-markup.hbs';
import debounce from 'lodash.debounce';
// import spinner from './spinner';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '0d09eb187785fad1be6a14878e771552';

const refs = getRefs();

class VideoApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchVideo() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.results;
      })
      .finally(() => {
        spinner.hide();
      });
  }

  fetchFilmsPagesQ() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    return fetch(url).then(response => response.json());
  }

  fetchGenresF() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ genres }) => {
        return genres;
      });
  }

  insertGenresToSearch() {
    return this.fetchVideo().then(data => {
      return this.fetchGenresF().then(genresList => {
        return data.map(movie => ({
          ...movie,
          release_date: movie.release_date ? movie.release_date.slice(0, 4) : '',
          first_air_date: movie.first_air_date ? movie.first_air_date.slice(0, 4) : '',
          genres: movie.genre_ids
            ? movie.genre_ids
                .map(id => genresList.filter(el => el.id === id))
                .slice(0, 2)
                .flat()
            : 'watch the movie and decide',
        }));
      });
    });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  get pageNum() {
    return this.page;
  }
  set pageNum(newPage) {
    this.page = newPage;
  }
}

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
  // refs.pagination.classList.remove('is-hidden');
  // refs.errorMessage.classList.add('is-hidden');
  if (filmApiService.query === '') {
    refs.main.classList.remove('is-hidden'); //-----------------убрать как появиться пагин
    // refs.pagination.classList.add('is-hidden');
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
    .catch(err => {
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

const spinner = {
  show() {
    spinnerRef.classList.remove('is-hidden');
  },
  hide() {
    setTimeout(() => {
      spinnerRef.classList.add('is-hidden');
    }, 550);
  },
};
