/*----------open modal LogIN------------*/

export const modalForm = {
  openModalBtn: document.querySelector('button[data-action="login"]'),

  closeModalBtn: document.querySelector('.btn__close'),
  backdrop: document.querySelector('.backdrop'),
  popup: document.querySelector('.popup'),
  linkToSignup: document.querySelector('.to_signup'),
  btnLoginSubmit: document.querySelector('.modal-login__form .btn__submit'),
  btnSignupSubmit: document.querySelector('.modal-signup__form .btn__submit'),
  formLogin: document.querySelector('.modal-login__form'),
  formSignup: document.querySelector('.modal-signup__form'),
  infoMessageStrLogin: document.querySelector('.modal-login__form .message'),
  infoMessageStrSignup: document.querySelector('.modal-signup__form .message'),
  userEmail: document.querySelector('.nav__item .user__name'),

  initForm() {
    this.formLogin.reset();
    this.formSignup.reset();
    this.btnLoginSubmit.disabled = false;
    this.btnSignupSubmit.disabled = false;
    this.infoMessageStrLogin.innerHTML = '';
    this.infoMessageStrSignup.innerHTML = '';
  },
};

modalForm.openModalBtn.addEventListener('click', toggleModal);
modalForm.closeModalBtn.addEventListener('click', toggleModal);
modalForm.linkToSignup.addEventListener('click', toggleForm);

function toggleModal() {
  modalForm.initForm();
  modalForm.backdrop.classList.toggle('is-hidden');
  modalForm.popup.querySelector('.modal-login__form').classList.add('active');
  modalForm.popup.querySelector('.modal-signup__form').classList.remove('active');
}
function toggleForm() {
  modalForm.initForm();
  modalForm.popup.querySelector('.modal-login__form').classList.remove('active');
  modalForm.popup.querySelector('.modal-signup__form').classList.add('active');
}
