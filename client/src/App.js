import React, {useState, useEffect} from 'react'
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/UI/Theme"; 
import { lightTheme, darkTheme } from "./components/UI/Theme";
import './App.scss'; 
import StartPage from './pages/StartPage/StartPage';
import { LoaderComponent } from './components/UI/SiteLoader';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUp from './pages/SignUpPage/SignUp';
import NotFound from './pages/NotFound';
function App() {
  const[loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true)
   setTimeout(() => {
      setLoading(false)
    }, 1000)
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
            <Route path='/' element={ <StartPage /> } />
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/signup' element={ <SignUp /> } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      }
    </>

  );
}

export default App; 