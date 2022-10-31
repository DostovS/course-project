import React, {useState, useEffect} from 'react'
import { Route, Routes } from 'react-router-dom';
/* === import Theme === */
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/UI/Theme"; 
import { lightTheme, darkTheme } from "./components/UI/Theme";
/* === import site loader === */
import  { LoaderComponent } from './components/UI/SiteLoader';
/* === import pages === */
import Header from './components/Header/Header';
import StartPage from './pages/StartPage/StartPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUp from './pages/SignUpPage/SignUp';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import CreateItemPage from "./pages/CreateItem";
import CollectionItems from "./pages/CollectionItem";
import Item from "./components/Item/Item";
import UserPage from "./pages/UserPage";
import CreateCollection from "./pages/CreateCollection";
import UpdateCollectionPage from "./pages/UpdateCollectionPage";
import UpdateItemPage from "./pages/UpdateItemPage";

/* === import styles === */
import './App.scss'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  const[loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true)
   setTimeout(() => {
      setLoading(false)
    }, 1500)
 },[]);

  const [theme, setTheme] = useState('light');
  const themeToggler =  
   () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <>
      {
        loading ? 
        <LoaderComponent /> :
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <GlobalStyles/>
          <Header themeToggler={themeToggler} theme={theme}/>
          <section id="container" className='container'>
            <Routes>  
              {localStorage.getItem("currentUser") ? (
                <Route path="/" element={ <HomePage /> } />
              ) : (
                <Route path="/" element={ <StartPage /> } />
              )}
              <Route path="*" element={<NotFound />} />
              <Route path='/login' element={ <LoginPage /> } />
              <Route path='/signup' element={ <SignUp /> } />
              <Route path="/profile" element={<ProfilePage />} />

          <Route path="/collection">
            <Route
              path="/collection/create/:username"
              element={<CreateCollection />}
            />
            <Route
              path="/collection/create-item/:username/:collectionID"
              element={<CreateItemPage />}
            />
            <Route
              path="/collection/items/:collectionID"
              element={<CollectionItems />}
            />
            <Route
              path="/collection/:username/:collectionID/update"
              element={<UpdateCollectionPage />}
            />
          </Route>
          <Route path="/item">
            <Route path="/item" element={<Item />} />
            <Route path="/item/edit/:id" element={<UpdateItemPage />} />
          </Route>
          <Route path="/user/:username">
            <Route path="/user/:username" element={<UserPage />} />
            <Route
              path="/user/:username/:collectionID"
              element={<CollectionItems />}
            ></Route>
          </Route>
          </Routes>
          </section>
        </ThemeProvider>
      }
    </>

  );
}

export default App; 