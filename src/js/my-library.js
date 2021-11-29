import { createUserWithEmailAndPassword } from '@firebase/auth';
import { user } from './auth';
import { toggleModal } from './open-modal-login';
import { readFromFBHundler, writeToFBHundler } from './read-write-to-firebase';
import main from '../templates/main-cards.hbs';
import resetRender from './resetRender';

const { renderMoviesList, clearGalleryContainer } = resetRender;

const myLibraryBtn = document.querySelector('button[data-action="to-library"]');
const myLibraryWatchedBtn = document.querySelector('button[data-action="open-watched-list"]');
const myLibraryQueueBtn = document.querySelector('button[data-action="open-queue-list"]');

myLibraryBtn.addEventListener('click', () => {
  clearGalleryContainer();
  if (user.isLogin) {
    toMyLibrary('watched');
    toMyLibrary('queue'); //склеить
  } else {
    toggleModal();
  }
});
myLibraryWatchedBtn.addEventListener('click', () => toMyLibrary('watched'));
myLibraryQueueBtn.addEventListener('click', () => toMyLibrary('queue'));

function toMyLibrary(collection) {
  if (user.isLogin) {
    clearGalleryContainer();
    readFromFBHundler(collection).then(data => renderMoviesList(data)); //вывести поля корректно
  } else {
    toggleModal();
  }
}

//'watched'
//'queue'
