import movieModal from '../templates/movie-modal.hbs';
import { User } from './user-class';
import { user } from './auth';
//========================================================

//=====================================================

export default class MovieModal {
  constructor(movie) {
    this.markup = movieModal(movie);
    this.refs;
    this.object = movie;
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
    //read from FB
    this.refs.watchedBtn.addEventListener('click', readFromFB);

    //write to FB
    this.refs.queueBtn.addEventListener('click', writeToFB);
  }

  closeModal() {
    this.refs.modal.remove();
  }
}
function readFromFB() {
  if (!user.isLogin) {
    console.log('нет данных');
    return;
  }
  return fetch(
    `https://gitpodmy-default-rtdb.europe-west1.firebasedatabase.app/collection/${user.idLocal}.json?auth=${user.id}`,
  )
    .then(response => response.json())
    .then(response => {
      if (response && response.error) {
        console.log('ошибка чтения из FB');
        //`<p class="error">${response.error}</p>`;
      }
      console.log(response);
    });
}

///////////////////////////////////////////////////////////////////////////////
const test = {
  nameFilm: 'llllll',
  rating: '0000000',
  cost: 'yyyyyyy',
};
function writeToFB() {
  if (!user.isLogin) {
    console.log('вы не зарегистрировны!');
    return;
  }
  return fetch(
    `https://gitpodmy-default-rtdb.europe-west1.firebasedatabase.app/collection/${user.idLocal}.json`,
    {
      method: 'POST',
      body: JSON.stringify(test),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response.json())
    .then(data => console.log(data));
}
