import { createUserWithEmailAndPassword } from '@firebase/auth';
import { user } from './auth';
import { toggleModal } from './open-modal-login';
import { readFromFBHundler, writeToFBHundler } from './read-write-to-firebase';
import resetRender from './resetRender';

const { renderLibraryList, clearGalleryContainer } = resetRender;

const myLibraryBtn = document.querySelector('button[data-action="to-library"]');
const myLibraryWatchedBtn = document.querySelector('button[data-action="open-watched-list"]');
const myLibraryQueueBtn = document.querySelector('button[data-action="open-queue-list"]');

myLibraryBtn.addEventListener('click', renderAllCollections);
myLibraryWatchedBtn.addEventListener('click', () => renderOneCollection('watched'));
myLibraryQueueBtn.addEventListener('click', () => renderOneCollection('queue'));

function renderOneCollection(collection) {
  if (user.isLogin) {
    clearGalleryContainer();
    readFromFBHundler(collection).then(data => renderLibraryList(data)); //вывести поля корректно
  } else {
    toggleModal();
  }
}

async function renderAllCollections() {
  clearGalleryContainer();

  if (user.isLogin) {
    let watchObj = await readFromFBHundler('watched').then(data => {
      return data;
    });
    let queueObj = await readFromFBHundler('queue').then(data => {
      return data;
    });
    let summaryObj = [...watchObj].concat(...queueObj);

    checkOnNecessaryPagination(summaryObj);
    renderLibraryList(summaryObj);
  } else {
    toggleModal();
  }
}

function checkOnNecessaryPagination(num) {
  if (num.length <= 6) document.querySelector('.tui-pagination').style.visibility = 'hidden';
}