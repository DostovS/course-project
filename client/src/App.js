import React, {useState} from 'react'
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./UI/theme";
import { lightTheme, darkTheme } from "./UI/theme";
import './App.scss';
function App() {
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles/>
      <Header themeToggler={themeToggler} theme={theme}/>
    </ThemeProvider>
  );
}

export default App;