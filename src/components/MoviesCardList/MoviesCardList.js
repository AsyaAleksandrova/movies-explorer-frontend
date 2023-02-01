import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, onAddMovie, onDeleteMovie, saved }) {

   const handleLoadMovies = () => {
      console.log('загружаю');
   }

   return (
      <section className='cinema'>
         <ul className="cinema__list">
            {(movies.length > 0) && movies.map((movie) => (
               <MoviesCard
                  movie={movie}
                  key={movie.id}
                  onAddMovie={onAddMovie}
                  onDeleteMovie={onDeleteMovie}
                  saved={saved}
               />
            ))}
         </ul>
         <button
            className={`cinema__more`}
            onClick={handleLoadMovies} >
            Ещё
         </button>
      </section>
   )
}

export default MoviesCardList;