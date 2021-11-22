/*----------open modal LogIN------------*/

export const modalForm = {
  openModalBtn: document.getElementById('login'),
  closeModalBtn: document.querySelector('.btn__close'),
  backdrop: document.querySelector('.backdrop'),
  popup: document.querySelector('.popup'),
  linkToSignup: document.querySelector('.to_signup'),
  btnLogin: document.querySelector('.modal-login__form .btn__submit'),
  btnSignup: document.querySelector('.modal-signup__form .btn__submit'),
  formLogin: document.querySelector('.modal-login__form'),
  formSignup: document.querySelector('.modal-signup__form'),

  initForm() {
    this.formLogin.reset();
    this.formSignup.reset();
    this.btnLogin.disabled = false;
    this.btnSignup.disabled = false;
  },
};

modalForm.openModalBtn.addEventListener('click', toggleModal);
modalForm.closeModalBtn.addEventListener('click', toggleModal);
modalForm.linkToSignup.addEventListener('click', toggleForm);

function toggleModal() {
  modalForm.backdrop.classList.toggle('is-hidden');
  modalForm.popup.querySelector('.modal-login__form').classList.add('active');
  modalForm.popup.querySelector('.modal-signup__form').classList.remove('active');
}
function toggleForm() {
  modalForm.popup.querySelector('.modal-login__form').classList.remove('active');
  modalForm.popup.querySelector('.modal-signup__form').classList.add('active');
}
