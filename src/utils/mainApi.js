const BASE_URL = 'https://videoapi.nomoredomainsclub.ru/api';

export const register = (name, email, password) => {
   return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password,})
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const login = (email, password) => {
   return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email, password)
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const logout = () => {
   return fetch(`${BASE_URL}/signout`, {
      method: 'POST',
      credentials: 'include'
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const checkToken = (id) => {
   return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      credentials: 'include'
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const editUser = (name, email) => {
   return fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(name, email)
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const addFilm = (movie) => {
   return fetch(`${BASE_URL}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie)
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const getMyFilms = () => {
   return fetch(`${BASE_URL}/movies`, {
      method: 'GET',
      credentials: 'include'
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const deleteFilm = (id) => {
   return fetch(`${BASE_URL}/movies/${id}`, {
      method: 'DELETE',
      credentials: 'include'
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};