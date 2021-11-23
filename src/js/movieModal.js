const refs = {
  closeBtn: document.querySelector('[data-close]'),
  modal: document.querySelector('[data-movieModal]'),
};

refs.closeBtn.addEventListener('click', closeModal);
refs.modal.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});

function closeModal(e) {
  refs.modal.classList.add('movie-modal__overlay--is-hidden');
}
