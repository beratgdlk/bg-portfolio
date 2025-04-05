import React from 'react';
import './styles/main.scss';
import Navbar from './components/Navbar/Navbar';
import Terminal from './components/Terminal/Terminal';
import AboutMe from './pages/AboutMe';
import Projects from './pages/Projects';
import ContactMe from './pages/ContactMe';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';

const App: React.FC = () => {
  return (
    <ProfileProvider>
      <Router>
        <Routes>
          <Route path="/_about-me" element={<AboutMe />} />
          <Route path="/_projects" element={<Projects />} />
          <Route path="/_contact-me" element={<ContactMe />} />
          <Route path="/" element={
            <>
              <Navbar />
              <Terminal />
            </>
          } />
        </Routes>
      </Router>
    </ProfileProvider>
  );
};

export default App;