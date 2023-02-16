import React, {useState, useEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, onAddMovie, onDeleteMovie, saved }) {

   const [initialCardsAmt, setInitialCardsAmt] = useState(() => {
      const windowSize = window.innerWidth;
      if (windowSize < 670) {
         return 5
        } else if (windowSize < 1060) {
         return 8
        } else {
         return 12
        }
   });
   
   const [addCardsAmt, setAddCardsAmt] = useState(() => {
      const windowSize = window.innerWidth;
      if(windowSize < 1060) {
         return 2
        } else {
         return 3
        }
   });

   const handleChangeWidth = () => {
        const windowSize = window.innerWidth;
        if(windowSize < 670) {
           setInitialCardsAmt(5);
           setAddCardsAmt(2);
        } else if(windowSize < 1060) {
           setInitialCardsAmt(8);
           setAddCardsAmt(2);
        } else {
           setInitialCardsAmt(12);
           setAddCardsAmt(3);
        }
   }  
   
    useEffect(() => {
        window.addEventListener('resize', handleChangeWidth);
    }, []);   
   
   let displayedMovies = movies;

   if (!saved) {
      displayedMovies = movies?.slice(0, initialCardsAmt);
   } 
   
   const handleLoadMovies = () => {
      setInitialCardsAmt(prevState => {return prevState + addCardsAmt});
   }

   return (
      <section className='cinema'>
         <ul className="cinema__list">
            {(displayedMovies.length > 0) && displayedMovies.map((movie) => (
               <MoviesCard
                  movie={movie}
                  key={saved? movie._id : movie.id}
                  onAddMovie={onAddMovie}
                  onDeleteMovie={onDeleteMovie}
                  saved={saved}
               />
            ))}
         </ul>
         {!saved && (movies.length > displayedMovies.length) &&
            <button
            className={`cinema__more`}
            onClick={handleLoadMovies} >
            Ещё
         </button>}
      </section>
   )
}

export default MoviesCardList;