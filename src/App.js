import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import FilmList from './components/FilmList';
import FilmDetails from './components/FilmDetails';

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<FilmList />} />
          <Route path="/film/:id" element={<FilmDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
