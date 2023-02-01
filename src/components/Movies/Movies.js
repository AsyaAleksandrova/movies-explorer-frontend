import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({movies, onAddMovie, onDeleteMovie}) {

   return (
      <main className='movies'>
         <SearchForm />
         <MoviesCardList
            movies={movies}
            onAddMovie={onAddMovie}
            onDeleteMovie={onDeleteMovie} />
      </main>
   )
}

export default Movies;