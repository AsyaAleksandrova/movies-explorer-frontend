import React from 'react';
import './SearchForm.css';

function SearchForm({ setOpenPreloader, openPopupInfo }) {

   const handleSubmit = (e) => {
      e.preventDefault();
      openPopupInfo('Ошибка поиска', 'Сервис поиска фильмов еще не разработан');
      setOpenPreloader(true);
      
   }

   return (
      <section className='search'>
         <form className='search__form' onSubmit={handleSubmit}>
            <label className='search__label'></label>
            <input className='search__input' placeholder='Фильм' />
            <button className='search__button' type='submit'></button>
            <div className='search__box'>
               <input className='search__hidebox' type='checkbox' id='short' />
               <label htmlFor='short' className='search__checkbox'></label>
               <label htmlFor='short' className='search__short'>Короткометражки</label>
            </div>
         </form>
      </section>
   )
}

export default SearchForm;