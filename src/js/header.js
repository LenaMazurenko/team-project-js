const vars = {
    homeBtn: document.querySelector('.nav__btn[data-action="to-home"]'),
    libraryBtn:  document.querySelector('.nav__btn[data-action="to-library"]'),
    seearchInput: document.querySelector('.searching__input'),
    searchBtn: document.querySelector('.searching__button'),
    errorText: document.querySelector('.searching__error__text'),
    watchedBtn: document.querySelector('.library__btn[data-action="open-watched-list"]'),
    queueBtn: document.querySelector('.library__btn[data-action="open-queue-list"]'),
    headerBg: document.querySelector('.header__cover'),
    homeBlock: document.querySelector('.home__block'),
    libraryBlock: document.querySelector('.library__block'),
};

// Кнопка поиска фильмов
vars.searchBtn.addEventListener('click', Search =() =>{
    if(vars.seearchInput.value === ""){
        vars.errorText.classList.remove('is-visible')
    }
    else{
        vars.errorText.classList.add('is-visible')
    }
})


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
vars.libraryBtn.addEventListener('click', ToLibrary = () => {
    vars.headerBg.classList.add('cabinet-open');
    vars.headerBg.classList.remove('home-open');
    vars.libraryBlock.classList.toggle('is-none');
    vars.homeBlock.classList.toggle('is-none');
})


//Кнопка перехода в дом
vars.homeBtn.addEventListener('click', ToHome = () =>{
    vars.headerBg.classList.add('home-open');
    vars.headerBg.classList.remove('cabinet-open');
    vars.libraryBlock.classList.toggle('is-none');
    vars.homeBlock.classList.toggle('is-none');
})


//кнопки библиотек
vars.watchedBtn.addEventListener('click', () =>{
    //Some code
})


vars.queueBtn.addEventListener('click', () =>{
    //Some code
})