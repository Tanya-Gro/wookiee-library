import type { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/UI/header/Header';
import HomePage from './pages/home/Home';
import NotFoundPage from './pages/404/NotFound';
import AboutPage from './pages/about/About';

function App(): ReactNode {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
