/*----------open modal LogIN------------*/

const refs = {
  openModalBtn: document.getElementById('login'),
  closeModalBtn: document.querySelector('.btn__close'),
  backdrop: document.querySelector('.backdrop'),
  popup: document.querySelector('.popup'),
  linkToSignup: document.querySelector('.to_signup'),
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.linkToSignup.addEventListener('click', toggleForm);

function toggleModal() {
  refs.backdrop.classList.toggle('is-hidden');
  refs.popup.querySelector('.modal-login__form').classList.add('active');
  refs.popup.querySelector('.modal-signup__form').classList.remove('active');
}
function toggleForm() {
  refs.popup.querySelector('.modal-login__form').classList.remove('active');
  refs.popup.querySelector('.modal-signup__form').classList.add('active');
}
