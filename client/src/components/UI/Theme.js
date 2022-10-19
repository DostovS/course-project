import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  `
export const lightTheme = {
  body: '#EBF5FF',
  text: '#363537',
  toggleBorder: '#FFF',
  background: '#363537',
}
export const darkTheme = {
  body: '#181A1B',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  background: '#999',
}