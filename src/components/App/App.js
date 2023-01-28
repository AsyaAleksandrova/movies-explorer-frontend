import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import NoPage from '../NoPage/NoPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Header/> }>
            <Route index element={ <Main /> } />
            <Route path='movies' element={ <Movies /> } />
            <Route path='saved-movies' element={<SavedMovies />} />
            <Route path='profile' element={ <Profile/> } />
            <Route path='signup' element={ <Register /> } />
            <Route path='signin' element={<Login />} />
            <Route index element={ <Footer /> } />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
