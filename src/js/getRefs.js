export default function getRefs() {
  return {
    input: document.querySelector('[data-input]'),
    gallery: document.querySelector('.gallery-list'),

    main: document.querySelector('.main'), //-----------------убрать как появиться пагин
    // errorMessage: document.querySelector('[data-error]'),
    // pagination: document.querySelector('.pagination__container'),
  };
}
