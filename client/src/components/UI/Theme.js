import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  .card {
    background: ${({ theme }) => theme.cardColor};
    color: ${({ theme }) => theme.cardText};
    transition: all 0.50s linear;
  }
  tbody {
    color: ${({ theme }) => theme.bodyText};
  }
  `
export const lightTheme = {
  body: '#F4F9FF',
  text: '#363537',
  cardColor: '#fff',
  cardText: '#000',
  toggleBorder: '#FFF',
  background: '#363537',
}
export const darkTheme = {
  body: '#181A1B',
  text: '#FAFAFA',
  cardColor: '#181818',
  cardText: '#fff',
  toggleBorder: '#6B8096',
  background: '#999',
}