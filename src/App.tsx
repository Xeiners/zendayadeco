import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGallery from './components/BentoGallery';
import Services from './components/Services';
import Contact from './components/Contact';
import MethodSection from './components/Method';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-linen">
      <Navbar />
      <main>
        <Hero />
        <BentoGallery />
        <Services />
        <MethodSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}