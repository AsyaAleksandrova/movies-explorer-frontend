import React, { useState } from 'react';
import './MoviesCard.css'

function MoviesCard({ movie, onAddMovie, onDeleteMovie }) {
   const [liked, setLiked] = useState(false);

   const duration = `${(Math.floor(movie.duration / 60) !== 0) ? (Math.floor(movie.duration / 60) + 'ч ') : ''}
                     ${movie.duration - Math.floor(movie.duration / 60) * 60}м`;
   const url = `https://api.nomoreparties.co/${movie.image.url}`;

   const handleLikeMovie = () => {
      if (liked) {
         setLiked(false);
         onDeleteMovie();
      } else {
         setLiked(true);
         onAddMovie();
      }
   }

   return (
      <li className='film'>
         <div className='film__container'>
            <h4 className='film__title'>{movie.nameRU}</h4>
            <p className='film__duration'>{duration}</p>
            <button onClick={handleLikeMovie} type='button' className={`film__like ${liked ? 'film__like_active' : ''}`}></button>
            <div className='film__preview-box'>
               <img src={url} alt={movie.nameRU} className='film__preview' />
            </div>
         </div>
      </li>
   )
}

export default MoviesCard;