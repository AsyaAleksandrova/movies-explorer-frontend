import React from 'react';
import './SavedMovies.css';
import '../Movies/Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {

   return (
      <main className='movies'>
         <MoviesCardList/>
      </main>
   )
}

export default SavedMovies;