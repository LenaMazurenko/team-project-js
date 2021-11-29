import { createUserWithEmailAndPassword } from '@firebase/auth';
import { user } from './auth';
import { toggleModal } from './open-modal-login';
import { readFromFBHundler, writeToFBHundler } from './read-write-to-firebase';
import main from '../templates/main-cards.hbs';
import resetRender from './resetRender';

const { renderMoviesList, clearGalleryContainer } = resetRender;

//myLibraryBtn = document.querySelector('button[data-action="to-library"]');
//myLibraryWatchedBtn = document.querySelector('button[data-action="open-watched-list"]');
//myLibraryQueueBtn = document.querySelector('button[data-action="open-queue-list"]');

export function toMyLibrary() {
  if (user.isLogin) {
    clearGalleryContainer();
  } else toggleModal();
}
