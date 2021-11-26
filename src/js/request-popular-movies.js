import ApiService from './apiService.js';
import MovieModal from './movieModal.js';
import objectTransformations from './objectTransformations.js';
import resetRender from './resetRender';

const { renderMoviesList, clearGalleryContainer } = resetRender;

const finder = new ApiService();
finder.searchType = 0;
finder.searchGenres();

export function popularMovies() {
  clearGalleryContainer();

  finder
    .searchMovies()

    .then(({ results }) => {
      return objectTransformations(results);
    })
    .then(data => {
      renderMoviesList(data);
      const galleryRefs = document.querySelectorAll('.gallery__list');
      galleryRefs.forEach(el => {
        el.addEventListener('click', () => {
          fetch(
            `https://api.themoviedb.org/3/movie/${el.id}?api_key=0d09eb187785fad1be6a14878e771552&language=en-US`,
          )
            .then(response => response.json())
            .then(response => {
              const info = new MovieModal(response);
              info.appendMarkup();
              info.getRefs();
              info.addEventListeners();
            });
        });
      });
    })

    .catch(err => console.warn(err));
}

popularMovies();
