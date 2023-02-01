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
import * as moviesApi from '../../utils/moviesApi';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'Asya', email: 'asya@asya.ru' });
  const [allMovies, setAllMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);

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

  const handleLogout = () => {
    console.log('Выход');
    setLoggedIn(false);
    navigate('/');
  };

  const handleEditUser = ({name, email}) => {
    console.log('ok');
    setCurrentUser({name: name, email: email});
  }

  const handleAddMovie = (movie) => {
    setMyMovies(myMovies.concat(movie));
    console.log('добавлено в любимое');
  }

  const handleDeleteMovie = (movie) => {
    let arr = myMovies;
    const del = arr.splice(arr.indexOf(movie), 1);
    setMyMovies(arr);
    console.log('удалено из любимого');
  }  

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
        console.log('запрошены видео с сервера');
    })
  }

  useEffect(() => {
    getMoviesSet();
  }, [])

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
                />} />
            <Route path='/saved-movies' element={
              <SavedMovies
                movies={myMovies}
                onDeleteMovie={handleDeleteMovie}
              />} />
          </Route>
          <Route path='/profile' element={<Profile currentUser={currentUser} onExit={ handleLogout } onSubmit={ handleEditUser } />} />
        </Route>
        <Route path='/signup' element={ <Register onSubmit={handleRegister} /> } />
        <Route path='/signin' element={<Login onSubmit={handleLogin} />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default App;
