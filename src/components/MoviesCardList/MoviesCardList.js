import React from 'react';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, onAddMovie, onDeleteMovie, saved }) {

   const handleLoadMovies = () => {
      console.log('ищу');
   }

   return (
      <section className='cinema'>
         <Preloader />
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