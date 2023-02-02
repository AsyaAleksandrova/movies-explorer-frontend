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

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'Asya', email: 'asya@asya.ru' });
  const [allMovies, setAllMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [openPreloader, setOpenPreloader] = useState(false);

  const handleRegister = () => {
    openPopupInfo('Регистрация', 'Обработка регистрации будет реализована на следующем этапе');
    setLoggedIn(true);
    navigate('/');
  };

  const handleLogin = () => {
    openPopupInfo('Вход', 'Обработка авторизации будет реализована на следующем этапе');
    setLoggedIn(true);
    navigate('/');
  };

  const handleLogout = () => {
    openPopupInfo('Выход', 'Обработка аутентификации будет реализована на следующем этапе');
    setLoggedIn(false);
    navigate('/');
  };

  const handleEditUser = ({ name, email }) => {
    openPopupInfo('Изменение данных', 'Обработка изменения данных пользователя будет реализована на следующем этапе');
    setCurrentUser({ name: name, email: email });
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
    moviesApi.getMovies()
      .then((movies) => {
        setAllMovies(movies);
        localStorage.setItem('movies', JSON.stringify(movies))
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        openPopupInfo('Информационное сообщение', 'Запрошены и отображены все видео с сервера. Их обработка будет реализована на следующем этапе.');
      })
  };

  useEffect(() => {
    getMoviesSet();
  }, []);

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
            />} />
        </Route>
        <Route path='/signup' element={
          <Register
            onSubmit={handleRegister}
          />} />
        <Route path='/signin' element={
          <Login
            onSubmit={handleLogin}
          />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <InfoPopup isOpen={isInfoPopupOpen} onClose={closeAllPopups} title={infoTitle} message={infoMessage} />
      {openPreloader && <Preloader />}
    </>
  );
}

export default App;
