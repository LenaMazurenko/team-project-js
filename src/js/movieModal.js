const movie = {
  adult: false,
  backdrop_path: '/waCRuAW5ocONRehP556vPexVXA9.jpg',
  belongs_to_collection: {
    id: 2344,
    name: 'The Matrix Collection',
    poster_path: '/lh4aGpd3U9rm9B8Oqr6CUgQLtZL.jpg',
    backdrop_path: '/bRm2DEgUiYciDw3myHuYFInD7la.jpg',
  },
  budget: 63000000,
  genres: [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
  ],
  homepage: 'http://www.warnerbros.com/matrix',
  id: 603,
  imdb_id: 'tt0133093',
  original_language: 'en',
  original_title: 'The Matrix',
  overview:
    'Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.',
  popularity: 82.201,
  poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
  production_companies: [
    {
      id: 79,
      logo_path: '/tpFpsqbleCzEE2p5EgvUq6ozfCA.png',
      name: 'Village Roadshow Pictures',
      origin_country: 'US',
    },
    {
      id: 372,
      logo_path: null,
      name: 'Groucho II Film Partnership',
      origin_country: '',
    },
    {
      id: 1885,
      logo_path: '/xlvoOZr4s1PygosrwZyolIFe5xs.png',
      name: 'Silver Pictures',
      origin_country: 'US',
    },
    {
      id: 174,
      logo_path: '/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png',
      name: 'Warner Bros. Pictures',
      origin_country: 'US',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'AU',
      name: 'Australia',
    },
    {
      iso_3166_1: 'US',
      name: 'United States of America',
    },
  ],
  release_date: '1999-03-30',
  revenue: 463517383,
  runtime: 136,
  spoken_languages: [
    {
      english_name: 'English',
      iso_639_1: 'en',
      name: 'English',
    },
  ],
  status: 'Released',
  tagline: 'Welcome to the Real World.',
  title: 'The Matrix',
  video: false,
  vote_average: 8.2,
  vote_count: 20246,
};

import movieModal from '../templates/movie-modal.hbs';

class MovieModal {
  constructor(movie) {
    this.markup = movieModal(movie);
    this.refs;
  }

  appendMarkup() {
    document.body.insertAdjacentHTML('beforeend', this.markup);
  }

  getRefs() {
    this.refs = {
      closeBtn: document.querySelector('[data-close]'),
      modal: document.querySelector('[data-movieModal]'),
      watchedBtn: document.querySelector('[data-addToWatched]'),
      queueBtn: document.querySelector('[data-addToQueue]'),
    };
  }

  addEventListeners() {
    this.refs.closeBtn.addEventListener('click', () => {
      this.closeModal();
    });

    this.refs.modal.addEventListener('click', e => {
      if (e.target === e.currentTarget) this.closeModal();
    });

    this.refs.watchedBtn.addEventListener('click', () => {});

    this.refs.queueBtn.addEventListener('click', () => {});
  }

  closeModal() {
    this.refs.modal.remove();
  }
}

const modal = new MovieModal(movie);
modal.appendMarkup();
modal.getRefs();
modal.addEventListeners();
