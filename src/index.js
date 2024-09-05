import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TokenProvider } from './context/TokenContext';
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <TokenProvider>    
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TokenProvider>,
)
