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
          <Suspense fallback={<FullscreenLoading message="Sayfa yükleniyor..." />}>
            <Routes>
              <Route 
                path="/_about-me" 
                element={
                  <ErrorBoundary fallback={<div>About Me sayfası yüklenirken hata oluştu.</div>}>
                    <AboutMe />
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/_projects" 
                element={
                  <ErrorBoundary fallback={<div>Projects sayfası yüklenirken hata oluştu.</div>}>
                    <Projects />
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/_contact-me" 
                element={
                  <ErrorBoundary fallback={<div>Contact Me sayfası yüklenirken hata oluştu.</div>}>
                    <ContactMe />
                  </ErrorBoundary>
                } 
              />
              <Route path="/" element={
                <ErrorBoundary fallback={<div>Ana sayfa yüklenirken hata oluştu.</div>}>
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