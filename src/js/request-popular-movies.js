
import ApiService from './apiService.js';
import objectTransformations from './objectTransformations.js';
import resetRender from './resetRender';

const { renderMoviesList, clearGalleryContainer } = resetRender;


const finder = new ApiService();
finder.searchType = 0;


export function popularMovies() {
 
  clearGalleryContainer();
  

  finder
    .searchMovies()
    
    .then(({ results }) => {
      return objectTransformations(results);
    })
    .then(data => {
      renderMoviesList(data);
     
      return data;
    })
    
    .catch(err => console.warn(err));
}

popularMovies();
