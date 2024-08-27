import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';

function App() {
  return (
    <Router>
      <div className="bg-dark">
      <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/page/:pageNumber" element={<HomePage />} />
  <Route path="/movie/:id" element={<MovieDetailsPage />} />
</Routes>
      </div>
    </Router>
  );
}

export default App;