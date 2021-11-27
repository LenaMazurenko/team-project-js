import movieModal from '../templates/movie-modal.hbs';
import { readFromFBHundler, writeToFBHundler } from './read-write-to-firebase';
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
    this.refs.watchedBtn.addEventListener('click', () => {
      writeToFBHundler('watched');
    });

    //write to FB
    this.refs.queueBtn.addEventListener('click', () => {
      writeToFBHundler('queue');
    });
  }

  closeModal() {
    this.refs.modal.remove();
  }
}
