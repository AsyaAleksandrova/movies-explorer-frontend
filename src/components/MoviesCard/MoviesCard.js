import React, { useState } from 'react';
import './MoviesCard.css'

function MoviesCard({ movie, onAddMovie, onDeleteMovie, saved }) {
   const [liked, setLiked] = useState(false);

   const duration = `${(Math.floor(movie.duration / 60) !== 0) ? (Math.floor(movie.duration / 60) + 'ч ') : ''}
                     ${movie.duration - Math.floor(movie.duration / 60) * 60}м`;
   const url = `https://api.nomoreparties.co/${movie.image.url}`;

   const handleLikeMovie = () => {
      if (saved) {
         onDeleteMovie(movie);
      } else {
         if (liked) {
            setLiked(false);
            onDeleteMovie(movie);
         } else {
            setLiked(true);
            onAddMovie(movie);
         }         
      }

   }

   return (
      <li className='film'>
         <div className='film__container'>
            <h4 className='film__title'>{movie.nameRU}</h4>
            <p className='film__duration'>{duration}</p>
            {!saved && <button onClick={handleLikeMovie} type='button' className={`film__like ${liked ? 'film__like_active' : ''}`}></button>}
            {saved && <button onClick={handleLikeMovie} type='button' className='film__delete'></button>}
            <div className='film__preview-box'>
               <img src={url} alt={movie.nameRU} className='film__preview' />
            </div>
         </div>
      </li>
   )
}

export default MoviesCard;