export const vars = {
  homeBtn: document.querySelector('.nav__btn[data-action="to-home"]'),
  libraryBtn: document.querySelector('.nav__btn[data-action="to-library"]'),
  seearchInput: document.querySelector('.searching__input'),
  searchBtn: document.querySelector('.searching__button'),
  errorText: document.querySelector('.searching__error__text'),
  watchedBtn: document.querySelector(
    '.library__btn[data-action="open-watched-list"]'
  ),
  queueBtn: document.querySelector(
    '.library__btn[data-action="open-queue-list"]'
  ),
  headerBg: document.querySelector('.header__cover'),
  homeBlock: document.querySelector('.home__block'),
  libraryBlock: document.querySelector('.library__block'),
  logInBtn: document.querySelector('.reg__btn[data-action="login"]'),
  RegisterBtn: document.querySelector('.reg__btn[data-action="register"]'),
  UsrName: document.querySelector('.user__name'),
  RegList: document.querySelector('.reg__list'),
  logolink: document.querySelector('.logo__link'),
  // Search
  input: document.querySelector('[data-input]'),
  gallery: document.querySelector('.gallery-list'),
  main: document.querySelector('.main'),
  errorMessage: document.querySelector('[data-error]'),
};
