import { useState } from 'react';

export function ValidateTextInput(minLingth, maxLength, typeInput) {
   const [error, setError] = useState('Поле не может быть пустым');

   const checkError = (input) => {
      if (input !== '') {
         if (typeInput === 'email') {
            const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(input) === false) {
               setError('Некорректнный Email')
            } else setError('')         
         } else {
            if (input.length < minLingth) {
               setError(`Поле не может быть меньше ${minLingth} символов`);
            } else if (input.length > maxLength) {
               setError(`Поле не может быть больше ${maxLength} символов`);
            } else {
               setError('');
            }               
         }
      }
      else {
         setError('Поле не может быть пустым');
      }        
   }

  return [error, checkError];
}