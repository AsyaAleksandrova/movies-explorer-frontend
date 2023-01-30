import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NoPage from '../NoPage/NoPage';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Routes>
        <Route path='/' element={ <Layout loggedIn={loggedIn} /> }>
          <Route path='/' element={ <Main /> } />
          <Route path='/movies' element={ <Movies /> } />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/signup' element={ <Register /> } />
        <Route path='/signin' element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default App;
