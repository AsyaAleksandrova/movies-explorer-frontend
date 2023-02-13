import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({movies, onDeleteMovie, openPopupInfo, setOpenPreloader, searchFilm}) {

   return (
      <main className='movies'>
         <SearchForm setOpenPreloader={setOpenPreloader} openPopupInfo={openPopupInfo} searchFilm={searchFilm} />
         <MoviesCardList
            movies={movies}
            onDeleteMovie={onDeleteMovie}
            saved={true}
         />
      </main>
   )
}

export default SavedMovies;