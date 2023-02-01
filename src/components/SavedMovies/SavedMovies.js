import React from 'react';
import './SavedMovies.css';
import '../Movies/Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({movies, onDeleteMovie}) {

   return (
      <main className='movies'>
         <SearchForm/>
         <MoviesCardList
            movies={movies}
            onDeleteMovie={onDeleteMovie}
            saved={true}
         />
      </main>
   )
}

export default SavedMovies;