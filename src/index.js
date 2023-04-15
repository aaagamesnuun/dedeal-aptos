import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Eye4eyeProvider} from "./context/Eye4eyeContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

const element = (

  <Eye4eyeProvider>
   <React.StrictMode>
    <App />
   </React.StrictMode>
  </Eye4eyeProvider>
);

root.render(element);