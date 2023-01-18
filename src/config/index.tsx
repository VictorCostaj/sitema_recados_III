import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-family: 'Roboto', sans-serif;
    }

    body {
        width: 100vw;
        height: 100vh;
        background-color: rgb(233, 199, 107);
        color: #0e0101;
    }

`

export { GlobalStyle }