import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Terminal from './components/Terminal/Terminal';
import { ProfileProvider } from './context/ProfileContext';
import AboutMe from './pages/AboutMe';
import ContactMe from './pages/ContactMe';
import Projects from './pages/Projects';
import './styles/main.scss';

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