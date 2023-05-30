import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, 
  *::after, 
  *::before {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img,
  iframe,
  video {
    max-width: 100%;
  }

  input,
  button {
    font-family: inherit;
  }

  button {
    cursor: pointer;
    font-size: 1rem;
  }

  body {
    margin: 0;
    background-color: ${(props) => props.theme.colors.mauve1};
    color:  ${(props) => props.theme.colors.gray12};
    font-family: "IBM Plex Sans", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`;

export { GlobalStyle };
