import React, {useState} from 'react'
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/UI/Theme"; 
import { lightTheme, darkTheme } from "./components/UI/Theme";
import './App.scss'; 
import StartPage from './pages/StartPage/StartPage';
function App() {
  const [theme, setTheme] = useState('light');
  const themeToggler =  
   () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles/>
      <Header themeToggler={themeToggler} theme={theme}/>
      <StartPage />
    </ThemeProvider>
  );
}

export default App; 