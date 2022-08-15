import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ROUTES } from './static/constants';
import HomePage from './pages/HomePage';
import BoardsPage from './pages/BoardsPage';
import BoardPage from './pages/BoardPage';
import NotFoundPage from './pages/NotFoundPage';

import './App.css';

function App() {
  return (
    <>
        <Router>
            <Fragment>
                <Routes>
                    <Route path={ROUTES.HOME} element={<HomePage />} />
                    <Route path={ROUTES.BOARDS} element={<BoardsPage />} />
                    <Route path={ROUTES.BOARD} element={<BoardPage />} />
                    <Route path={ROUTES.NOTFOUND} element={<NotFoundPage />} />
                </Routes>
            </Fragment>
      </Router>
    </>
  );
}

export default App;
