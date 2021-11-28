const vars = {
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
};
//is-none: display: none
//is-visible: opacity:0

// Кнопка поиска фильмов
vars.searchBtn.addEventListener(
  'click',
  (Search = () => {
    if (vars.seearchInput.value === '') {
      vars.errorText.classList.remove('is-visible');
    } else {
      vars.errorText.classList.add('is-visible');
    }
  })
);

//Поиск фильмов по Enter, если никто еще не биндил Enter
/*window.addEventListener('keyup', (e) =>{
    if(e.key === "Enter"){
        Search();
    }
    else{
        return;
    }
})*/

//////////////////////////////////////////////////////
//Кнопка перехода в библиотеку
vars.libraryBtn.addEventListener(
  'click',
  (ToLibrary = () => {
    vars.headerBg.classList.add('cabinet-open');
    vars.headerBg.classList.remove('home-open');
    vars.libraryBlock.classList.remove('is-none');
    vars.homeBlock.classList.add('is-none');
    vars.libraryBtn.classList.add('current');
    vars.homeBtn.classList.remove('current');
  })
);

//Кнопка перехода в дом
vars.homeBtn.addEventListener(
  'click',
  (ToHome = () => {
    vars.headerBg.classList.add('home-open');
    vars.headerBg.classList.remove('cabinet-open');
    vars.libraryBlock.classList.add('is-none');
    vars.homeBlock.classList.remove('is-none');
    vars.libraryBtn.classList.remove('current');
    vars.homeBtn.classList.add('current');
  })
);

//кнопки библиотек
vars.watchedBtn.addEventListener('click', () => {
  //Some code
});

vars.queueBtn.addEventListener('click', () => {
  //Some code
});

//Кнопки регистрации
vars.logInBtn.addEventListener(
  'click',
  (LogIn = () => {
    //For logining
  })
);

/*
vars.RegisterBtn.addEventListener('click', Register = () =>{
    //For register
})
*/
