import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ movies, onAddMovie, onDeleteMovie, openPopupInfo, setOpenPreloader }) {

   return (
      <main className='movies'>
         <SearchForm setOpenPreloader={setOpenPreloader} openPopupInfo={openPopupInfo} />
         <MoviesCardList
            movies={movies}
            onAddMovie={onAddMovie}
            onDeleteMovie={onDeleteMovie}
            saved={false}
         />
      </main>
   )
}

export default Movies;