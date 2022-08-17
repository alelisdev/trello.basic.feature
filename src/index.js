import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import GlobalProvider from "./context/GlobalProvider";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalProvider>
                <App />
            </GlobalProvider>
        </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
