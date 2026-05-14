import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGallery from './components/BentoGallery';
import MethodSection from './components/Method';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Showroom from './pages/Showroom';

// Page d'accueil
function Home() {
  return (
    <>
      <Hero />
      <BentoGallery />
      <MethodSection />
      <Services />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-linen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/showroom" element={<Showroom />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}