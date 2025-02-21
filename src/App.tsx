import React from 'react';
import './styles/main.scss';
import Navbar from './components/Navbar/Navbar';
import Terminal from './components/Terminal/Terminal';
import AboutMe from './pages/AboutMe';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/_about-me" element={<AboutMe />} />
        <Route path="/" element={
          <div style={{ 
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative'
          }}>
            <Navbar />
            <Terminal />
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;