import React, {useState} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleRegister = () => {
    console.log('Регистрация');
    setLoggedIn(true);
    navigate('/');
  }

  const handleLogin = () => {
    console.log('Вход');
    setLoggedIn(true);
    navigate('/');
  }  

  return (
    <>
      <Routes>
        <Route path='/' element={ <Layout loggedIn={loggedIn} /> }>
          <Route path='/' element={ <Main /> } />
          <Route path='/movies' element={ <Movies /> } />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/signup' element={ <Register onSubmit={handleRegister} /> } />
        <Route path='/signin' element={<Login onSubmit={handleLogin} />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default App;
