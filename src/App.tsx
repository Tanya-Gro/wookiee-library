import type { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/UI/layout/Layout';
import HomePage from './pages/home/Home';
import NotFoundPage from './pages/404/NotFound';
import AboutPage from './pages/about/About';
import CardDetails from './components/UI/CardDetails/CardDetails';

function App(): ReactNode {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />

          <Route path="home" element={<HomePage />}>
            <Route path="" element={<CardDetails />} />
          </Route>

          <Route path="about" element={<AboutPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
