/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NoPage from '../NoPage/NoPage';
import InfoPopup from '../InfoPopup/InfoPopup';
import Preloader from '../Preloader/Preloader';
import * as moviesApi from '../../utils/moviesApi';
import * as mainApi from '../../utils/mainApi';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', _id: '' });
  const [allMovies, setAllMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [openPreloader, setOpenPreloader] = useState(false);
  const [regError, setRegError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [editError, setEditError] = useState('');

  const handleRegister = ({ name, email, password}) => {
    return mainApi.register(name, email, password)
      .then((res) => {
        openPopupInfo('Регистрация', 'Регистрация прошла успешно! Добро пожаловать на сайт!');
        setCurrentUser({ name: res.user.name, email: res.user.email, _id: res.user._id });
        setLoggedIn(true);
        navigate('/movies');     
      })
      .catch((e) => {
        switch(e.status) {
          case 409: setRegError('Пользователь с таким email уже зарегистрирован.');
            break;
          case 400: setRegError('Переданые некорректные данные при создании пользователя.');
            break;
          default: setRegError('Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
      });
  };

  const handleLogin = (email, password) => {
    return mainApi.login(email, password)
      .then((res) => {
        setCurrentUser({ name: res.user.name, email: res.user.email, _id: res.user._id });
        setLoggedIn(true);
        navigate('/movies'); 
      })
      .catch((e) => {
       closeAllPopups();
        switch(e.status) {
          case 401: setLoginError('Некорректно указаны почта и/или пароль.');
            break;        
          default: setLoginError('Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
      });
  };

  const handleLogout = () => {
    return mainApi.logout()
      .then(() => {
        setCurrentUser({ name: '', email: '', _id: '' });
        setLoggedIn(false);
        navigate('/');
      })
      .catch((e) => {
        openPopupInfo('Ошибка', 'Что-то пошло не так. Попробуйте повторить запрос.');
      })  
  };

  const handleEditUser = (name, email) => {
    return mainApi.editUser()
      .then((res) => {
        setCurrentUser({ name: res.user.name, email: res.user.email });
        setLoggedIn(true);
        openPopupInfo('Изменение данных', 'Данные пользователя успешно изменены');
      })
      .catch((e) => {
        switch(e.status) {
          case 409: setEditError('Пользователь с таким email уже зарегистрирован.');
            break;
          case 400: setEditError('Переданые некорректные данные при изменении пользователя.');
            break;
          default: setEditError('Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
      });    
  };

  const handleAddMovie = (movie) => {
    setMyMovies(myMovies.concat(movie));
    openPopupInfo('Информационное сообщение', 'Добавлено в любимое. Передача данных на cервер еще не реализована');
  };

  const handleDeleteMovie = (movie) => {
    let arr = myMovies;
    arr.splice(arr.indexOf(movie), 1);
    setMyMovies(arr);
    openPopupInfo('Информационное сообщение', 'Видео удалено из списка сохраненных. Передача данных на cервер еще не реализована');
  };

  const getMoviesSet = () => {
    return moviesApi.getMovies()
      .then((movies) => {
        setAllMovies(movies);
        localStorage.setItem('movies', JSON.stringify(movies))
      })
      .catch((e) => {
        console.log(e)
      })
  };

  const searchFilm = () => {
    getMoviesSet()
  }

  const openPopupInfo = (title, message) => {
    setInfoTitle(title);
    setInfoMessage(message);
    setIsInfoPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsInfoPopupOpen(false);
    setOpenPreloader(false);
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Header loggedIn={loggedIn} />}>
          <Route path='/' element={ <Footer/> }>
            <Route path='/' element={<Main  /> } />
            <Route path='/movies'
              element={
                <Movies
                  movies={allMovies}
                  onAddMovie={handleAddMovie}
                  onDeleteMovie={handleDeleteMovie}
                  openPopupInfo={openPopupInfo}
                  setOpenPreloader={setOpenPreloader}
                  searchFilm={getMoviesSet}
                />} />
            <Route path='/saved-movies' element={
              <SavedMovies
                movies={myMovies}
                onDeleteMovie={handleDeleteMovie}
                openPopupInfo={openPopupInfo}
                setOpenPreloader={setOpenPreloader}
              />} />
          </Route>
          <Route path='/profile' element={
            <Profile
              currentUser={currentUser}
              onExit={handleLogout}
              onSubmit={handleEditUser}
              error={editError}
              setError={setEditError}
            />} />
        </Route>
        <Route path='/signup' element={
          <Register
            onSubmit={handleRegister}
            error={regError}
            setError={setRegError}
          />} />
        <Route path='/signin' element={
          <Login
            onSubmit={handleLogin}
            error={loginError}
            setError={setLoginError}
          />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <InfoPopup isOpen={isInfoPopupOpen} onClose={closeAllPopups} title={infoTitle} message={infoMessage} />
      {openPreloader && <Preloader />}
    </>
  );
}

export default App;
