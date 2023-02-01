import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({movies, onDeleteMovie, openPopupInfo, setOpenPreloader}) {

   return (
      <main className='movies'>
         <SearchForm setOpenPreloader={setOpenPreloader} openPopupInfo={openPopupInfo} />
         <MoviesCardList
            movies={movies}
            onDeleteMovie={onDeleteMovie}
            saved={true}
         />
      </main>
   )
}

export default SavedMovies;