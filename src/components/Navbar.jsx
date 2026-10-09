import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import bookConfig from '../data/bookConfig';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, [location.pathname]); // Re-check when route changes

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

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getLinkTo = (href) => {
    if (href.startsWith('#')) {
      return isHomePage ? href : '/' + href;
    }
    return href;
  };

  // Determine Nav background
  const navBgClass = (isScrolled || !isHomePage)
    ? 'bg-[#0a0a0a]/90 backdrop-blur-xl py-4 shadow-[0_10px_35px_rgba(0,0,0,0.85)]'
    : 'bg-transparent py-6';

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-[background-color,padding,box-shadow] duration-500 ${navBgClass}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo — calligraphy to match the title */}
        <Link
          to="/"
          className="text-[#c42b2b] text-2xl md:text-3xl relative group"
          style={{ fontFamily: '"Great Vibes", cursive' }}
        >
          {bookConfig?.title || 'Promises'}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {bookConfig.navLinks?.map((link) => (
            <Link
              key={link.label}
              to={getLinkTo(link.href)}
              className="text-[#f5f0e8]/65 hover:text-[#f5f0e8] text-[11px] tracking-[0.18em] uppercase relative group transition-colors duration-300"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c42b2b]/60 transition-all duration-400 group-hover:w-full"></span>
            </Link>
          ))}

          {/* Auth UI */}
          {user ? (
            <div className="flex items-center space-x-4 border-l border-[#c42b2b]/30 pl-8">
              <span className="text-[#f5f0e8] text-[11px] tracking-[0.15em] uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>
                {user.name || 'User'}
              </span>
              <button
                onClick={handleSignOut}
                className="text-[#c42b2b] hover:text-[#f5f0e8] text-[11px] tracking-[0.15em] uppercase transition-colors"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1.5 border border-[#c42b2b]/60 text-[#f5f0e8] hover:bg-[#c42b2b]/10 text-[11px] tracking-[0.2em] uppercase font-medium select-none shadow-[0_0_12px_rgba(196,43,43,0.15)] transition-colors"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Sign In
            </Link>
          )}
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
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                >
                  <Link
                    to={getLinkTo(link.href)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[#f5f0e8] text-xl tracking-[0.2em] uppercase block"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-6 flex flex-col items-center"
              >
                {user ? (
                  <div className="flex flex-col items-center space-y-4">
                    <span className="text-[#f5f0e8] text-sm tracking-[0.15em] uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>
                      {user.name || 'User'}
                    </span>
                    <button
                      onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                      className="text-[#c42b2b] hover:text-[#f5f0e8] text-xs tracking-[0.15em] uppercase transition-colors"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-6 py-2 border border-[#c42b2b]/60 text-[#f5f0e8] text-xs tracking-[0.2em] uppercase font-medium select-none"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    Sign In
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
