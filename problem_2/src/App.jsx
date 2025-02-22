import React from "react";
import CurrencySwapForm from "./CurrencySwap";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    background-color: #e0e0e0;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const AppContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 20px;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <CurrencySwapForm />
      </AppContainer>
    </>
  );
};

export default App;
