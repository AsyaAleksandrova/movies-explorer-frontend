import React, {useState} from 'react';
import './SearchForm.css';

function SearchForm({ setOpenPreloader, openPopupInfo, searchFilm }) {
   const [query, setQuery] = useState('');
   const [short, setShort] = useState(false);

   const handleChangeQuery = (e) => {
      setQuery(e.target.value);
   };

   const handleChangeShort = () => {
      if (short) {
         setShort(false);
      } else {
         setShort(true);
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (query === '') {
         openPopupInfo('Ошибка поиска', 'Нужно ввести ключевое слово');
      } else {
         setOpenPreloader(true);
         searchFilm(query, short)
          .finally(() => {
            setQuery('');
            setOpenPreloader(false);
         });           
      }
   }

   return (
      <section className='search'>
         <form className='search__form' onSubmit={handleSubmit}>
            <label className='search__label'></label>
            <input className='search__input' type='search' value={query} onChange={handleChangeQuery} placeholder='Фильм' />
            <button className='search__button' type='submit'></button>
            <div className='search__box'>
               <input className='search__hidebox' type='checkbox' checked={short} onChange={handleChangeShort} id='short' />
               <label htmlFor='short' className='search__checkbox'></label>
               <label htmlFor='short' className='search__short'>Короткометражки</label>
            </div>
         </form>
      </section>
   )
}

export default SearchForm;