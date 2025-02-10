import React from 'react';
import './styles/main.scss';
import Navbar from './components/Navbar/Navbar';
import Terminal from './components/Terminal/Terminal';

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <Terminal />
    </div>
  );
};

export default App;