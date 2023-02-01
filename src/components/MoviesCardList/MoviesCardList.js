import React from 'react';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, onAddMovie, onDeleteMovie }) {

   const handleLoadMovies = () => {

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
                  onDeleteMovie={onDeleteMovie} />
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