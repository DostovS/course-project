import React, {useState, useEffect} from 'react'
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/UI/Theme"; 
import { lightTheme, darkTheme } from "./components/UI/Theme";
import  { LoaderComponent } from './components/UI/SiteLoader';
import { Route, Routes } from 'react-router-dom';
import StartPage from './pages/StartPage/StartPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUp from './pages/SignUpPage/SignUp';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import './App.scss'; 
import CreateItemPage from './pages/CreateItem';
import Item from './components/Item/Item';
import UserPage from './pages/UserPage';
import CollectionItems from './pages/CollectionItem';
import CreateCollection from './pages/CreateCollection'
import UpdateItemPage from './pages/UpdateItemPage';
import UpdateCollectionPage from "./pages/UpdateCollectionPage";
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
              path="/collection/:collectionID"
              element={<CollectionItems />}
            />
            <Route
              path="/collection/:username/:collectionID/update"
              element={<UpdateCollectionPage />}
            />
          </Route>
          <Route path="/item">
            <Route path="/item" element={<Item />} />
            <Route
              path="/item/:username/:collectionID/:id/update"
              element={<UpdateItemPage />}
            />
          </Route>
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/user/:username">
            <Route
              path="/user/:username/:collectionID"
              element={<CollectionItems />}
            >
              <Route
                path="/user/:username/:collectionID/create"
                element={<CreateItemPage />}
              />
            </Route>
          </Route>
          </Routes>
        </ThemeProvider>
      }
    </>

  );
}

export default App; 