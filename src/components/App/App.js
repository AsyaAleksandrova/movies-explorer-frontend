import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
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
  // eslint-disable-next-line no-unused-vars
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <Routes>
          <Route path='/' element={ <Main /> } />
          <Route path='/movies' element={ <Movies /> } />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={ <Profile/> } />
          <Route path='/signup' element={ <Register /> } />
          <Route path='/signin' element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer /> 
    </>
  );
}

export default App;
