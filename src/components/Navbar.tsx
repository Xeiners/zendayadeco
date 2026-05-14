import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ArrowUpRight } from 'lucide-react';

const menuItems = [
  { label: 'Collections', targetId: 'collections', hasDropdown: false },
  { label: 'Showroom', targetId: 'showroom', hasDropdown: true },
  { label: 'Services', targetId: 'services', hasDropdown: false },
  { label: 'Contact', targetId: 'contact', hasDropdown: false },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isShowroomPage = location.pathname === '/showroom';

  const goToHome = () => {
    setIsOpen(false);
    navigate('/');
  };

  const scrollToSection = (targetId: string) => {
    if (targetId === 'showroom') {
      navigate('/showroom');
      setIsOpen(false);
      return;
    }

    if (isShowroomPage) {
      goToHome();
      return;
    }

    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setIsOpen(false);
  };

  const goToHomeSection = (targetId: string) => {
    setIsOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(() => {
        const targetSection = document.getElementById(targetId);
        targetSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return;
    }

    const targetSection = document.getElementById(targetId);
    targetSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Détecte le scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50 || isShowroomPage);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isShowroomPage]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 ,ease: 'easeOut' }}
      className={`
        fixed top-6 left-0 right-0 z-50 max-w-380
        transition-all duration-500 ease-in-out
          ${isScrolled 
          ? 'w-[95%] mx-auto py-2 px-4 bg-white/40 backdrop-blur-xl border scale-95 border-white/40 rounded-full shadow-l' 
          : 'w-[95%] mx-auto py-2 px-4 bg-transparent border border-transparent'
        }
      `}
    >
      <div className={`
        flex items-center justify-between w-full
      `}>
        {/* Left Side */}
        <div className="flex-1 hidden md:block">
          <h1 className={`font-serif font-bold text-sage text-2xl pl-5 transition-all duration-300`}>
            Zendayadeco
          </h1>
        </div>

        {/* Center Menu Desktop */}
        <ul className={`
          hidden md:flex items-center gap-8 
          font-sans font-normal text-sm
          ${isScrolled ? 'text-sage' : 'text-white'}
          transition-colors duration-300
        `}>
          {menuItems.map((item) => (
            <li
              key={item.label}
              className="hover:opacity-70 transition-opacity flex items-center gap-1 group"
            >
              <button
                type="button"
                onClick={() => scrollToSection(item.targetId)}
                className="flex items-center gap-1 cursor-pointer"
              >
                {item.label}
              </button>
              {item.hasDropdown && <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
            </li>
          ))}
        </ul>

        {/* Mobile Logo */}
        <div className="md:hidden">
          <span className={`
            font-serif tracking-tighter text-xl 
            ${isScrolled ? 'text-sage' : 'text-white'}
            transition-colors duration-300
          `}>
            Zendayadeco
          </span>
        </div>

        {/* Right Button */}
        <div className="flex-1 flex justify-end">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (isShowroomPage ? goToHome() : scrollToSection('contact'))}
            className={`
              hidden md:flex items-center rounded-full pl-2 pr-4 md:pr-6 py-1.5 md:py-2 gap-2 md:gap-3 border border-white/0
              transition-colors duration-300 group
              ${isScrolled 
                ? 'bg-sage text-white hover:bg-terracotta ' 
                : 'bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30'
              }
            `}
          >
            <div className={`
              p-1 md:p-1.5 rounded-full flex items-center justify-center
              ${isScrolled ? 'bg-white/20' : 'bg-white/20'}
            `}>
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-xs md:text-sm font-normal">Prendre RDV</span>
          </motion.button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${isScrolled ? 'text-sage' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-linen/95 backdrop-blur-md border-t border-sage/10 p-6 md:hidden z-50 mt-2 rounded-2xl"
          >
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.targetId)}
                    className="block font-sans text-base text-sage/80 hover:text-sage transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-4">
                <button
                  type="button"
                  onClick={() => (isShowroomPage ? goToHome() : scrollToSection('contact'))}
                  className="inline-flex items-center bg-sage text-white rounded-full px-6 py-2.5 font-sans text-sm"
                >
                  Prendre RDV
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}