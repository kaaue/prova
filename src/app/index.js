import React from 'react';
import ReactDOM from 'react-dom';
import Page from './page'; // Importe o componente Page

ReactDOM.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
  document.getElementById('handleNewButtonClick') // Certifique-se de que o ID corresponda ao elemento no HTML
);
