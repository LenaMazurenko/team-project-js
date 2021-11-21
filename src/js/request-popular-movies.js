
import ApiService from './apiService.js';
import objectTransformations from './objectTransformations.js';
import Loader from './loader.js';
import resetRender from './resetRender';

const { renderMoviesList, clearGalleryContainer } = resetRender;

const changeLoader = new Loader('.loader');
const finder = new ApiService();
finder.searchType = 0;


export function popularMovies() {
  changeLoader.addLoader();
  clearGalleryContainer();
  

  finder
    .searchMovies()
    
    .then(({ results }) => {
      return objectTransformations(results);
    })
    .then(data => {
      renderMoviesList(data);
      changeLoader.clearLoader();
      return data;
    })
    
    .catch(err => console.warn(err));
}

popularMovies();
