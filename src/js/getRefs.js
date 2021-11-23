export default function getRefs() {
  return {
    input: document.querySelector('[data-input]'),
    gallery: document.querySelector('.gallery-list'),
    errorMessage: document.querySelector('[data-error]'),
    // pagination: document.querySelector('.pagination__container'),
  };
}
