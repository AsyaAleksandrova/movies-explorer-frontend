/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import './Profile.css';
import { useForm } from '../../hooks/useForm';
import { ValidateTextInput } from '../../hooks/validateTextInput';

function Profile({ currentUser, onExit, onSubmit }) {
   const [isEdit, setIsEdit] = useState(false);
   const [btnName, setBtnName] = useState('Сохранить');
   const [disableButton, setDisableButton] = useState(true);
   const [name, handleChangeName, isChangedName, blurName, setBlurName, refreshName] = useForm('');
   const [nameError, checkNameError] = ValidateTextInput(2, 30, 'text');
   const [email, handleChangeEmail, isChangedEmail, blurEmail, setBlurEmail, refreshEmail] = useForm('');
   const [emailError, checkEmailError] = ValidateTextInput(0, 200, 'email');   

   useEffect(() => {
      setIsEdit(false);
      refreshName(currentUser.name);
      refreshEmail(currentUser.email);
   }, []);

   useEffect(() => { checkNameError(name) }, [name]);
   useEffect(() => { checkEmailError(email) }, [email]);
   useEffect(() => { checkButton() }, [nameError, emailError])

   function checkButton() {
      if (nameError==='' && emailError==='') {
         setDisableButton(false)
      } else {
         setDisableButton(true);
      }
   }

   function handleSubmit(e) {
      e.preventDefault();
      setBtnName('Проверяем...');
      onSubmit({ name, email })
//         .finally(() => {
      setBtnName('Сохранить');
      setIsEdit(false);
//    });
   }     
   
   const handleExit = () => {
      onExit();
   }

   const handleEdit = () => {
      setIsEdit(true);
   }

   return (
      <main className='main'>
         <div className='profile'>
            <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
            <form className='profile__info' onSubmit={handleSubmit} name='editProfile'>
               <div className='profile__item'>
                  <p className='profile__text'>Имя</p>
                  {!isEdit && <p className='profile__text'>{currentUser.name}</p>}
                  {isEdit && 
                   <input
                     onBlur={setBlurName}
                     onChange={handleChangeName}
                     value={name}
                     type="text"
                     name="name"
                     required
                     minLength="2"
                     maxLength="30"
                     className={`profile__input ${(isChangedName && nameError) && 'profile__input_invalid'}`}
                     placeholder=""
                  />}
                  {(isEdit && blurName && nameError) && <div className='profile__error'>{ nameError }</div>}
               </div>
               <div className='profile__item'>
                  <p className='profile__text'>E-mail</p>
                  {!isEdit && <p className='profile__text'>{currentUser.email}</p>}
                  {isEdit &&
                  <input
                     onBlur={setBlurEmail}
                     onChange={handleChangeEmail}
                     value={email}
                     type="email"
                     name="email"
                     autoComplete="username"
                     required
                     className={`profile__input ${(isChangedEmail && emailError) && 'profile__input_invalid'}`}
                     placeholder=""
                  /> }
                  {(isEdit && blurEmail && emailError) && <div className='profile__error'>{ emailError }</div>}
               </div>
               {isEdit && <button type="submit" className="auth__button" disabled={disableButton}>{btnName}</button>}
            </form>
            <div className='profile__buttons'>
               {!isEdit && <button onClick={ handleEdit } className='profile__edit' type='button'>Редактировать</button>}
               <button onClick={ handleExit } className='profile__exit' type='button'>Выйти из аккаунта</button>               
            </div>
         </div>
      </main>
   )
}

export default Profile;