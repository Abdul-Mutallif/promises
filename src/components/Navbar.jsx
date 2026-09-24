import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bookConfig from '../data/bookConfig';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu scroll lock and escape key
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl py-4 border-b border-white/[0.04]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo — calligraphy to match the title */}
        <a
          href="#home"
          className="text-[#c42b2b] text-2xl md:text-3xl relative group"
          style={{ fontFamily: '"Great Vibes", cursive' }}
        >
          {bookConfig?.title || 'Promises'}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {bookConfig.navLinks?.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#f5f0e8]/65 hover:text-[#f5f0e8] text-[11px] tracking-[0.18em] uppercase relative group transition-colors duration-300"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c42b2b]/60 transition-all duration-400 group-hover:w-full"></span>
            </a>
          ))}

          {/* Status Tag */}
          <div
            className="px-4 py-1.5 border border-[#c42b2b]/60 text-[#f5f0e8] text-[11px] tracking-[0.2em] uppercase font-medium select-none shadow-[0_0_12px_rgba(196,43,43,0.15)]"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            {bookConfig?.status || 'Coming Soon'}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#f5f0e8] focus:outline-none z-50 relative"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block w-full h-[1.5px] bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
            <span className={`block w-full h-[1.5px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-full h-[1.5px] bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center h-screen w-full"
          >
            <div className="flex flex-col space-y-8 items-center">
              {bookConfig.navLinks?.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className="text-[#f5f0e8] text-xl tracking-[0.2em] uppercase"
                  style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-4 px-6 py-2 border border-[#c42b2b]/60 text-[#f5f0e8] text-xs tracking-[0.2em] uppercase font-medium select-none"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {bookConfig?.status || 'Coming Soon'}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
