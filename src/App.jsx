import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Componentes como Páginas (según tu estructura)
import Home from './pages/Home';
import Booking from './components/booking/Booking'; // <--- Corregido aquí

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-surface">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agendar" element={<Booking />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;