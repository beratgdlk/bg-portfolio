import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Footer from './components/Footer/Footer';
import { FullscreenLoading } from './components/Loading/Loading';
import Navbar from './components/Navbar/Navbar';
import Terminal from './components/Terminal/Terminal';
import { ProfileProvider } from './context/ProfileContext';
import './styles/main.scss';

// Lazy load pages for better performance
const AboutMe = React.lazy(() => import('./pages/AboutMe'));
const ContactMe = React.lazy(() => import('./pages/ContactMe'));
const Projects = React.lazy(() => import('./pages/Projects'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ProfileProvider>
        <Router>
          <Suspense fallback={<FullscreenLoading message="Loading page..." />}>
            <Routes>
              <Route 
                path="/_about-me" 
                element={
                  <ErrorBoundary>
                    <AboutMe />
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/_projects" 
                element={
                  <ErrorBoundary>
                    <Projects />
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/_contact-me" 
                element={
                  <ErrorBoundary>
                    <ContactMe />
                  </ErrorBoundary>
                } 
              />
              <Route path="/" element={
                <ErrorBoundary>
                  <Navbar />
                  <Terminal />
                  <Footer />
                </ErrorBoundary>
              } />
            </Routes>
          </Suspense>
        </Router>
      </ProfileProvider>
    </ErrorBoundary>
  );
};

export default App;