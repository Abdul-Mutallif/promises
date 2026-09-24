import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import bookConfig from '../data/bookConfig';

export default function UnopenedLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  // Escape key closes letter modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <section className="py-24 md:py-32 bg-[#0d0c0c] text-[#f5f0e8] relative overflow-hidden" ref={ref}>
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(circle,rgba(196,43,43,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="text-[#c42b2b] text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium block mb-4"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              CONFIDENTIAL NOTE
            </span>
            <h2
              className="text-3xl md:text-4xl text-[#f5f0e8] mb-4"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontStyle: 'italic' }}
            >
              Why I Wrote {bookConfig?.subtitle}
            </h2>
            <p
              className="text-xs sm:text-sm text-[#e8e0d4]/50 max-w-md mx-auto mb-14"
              style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
            >
              A sealed personal letter from author {bookConfig?.author || 'Abdul Mutallif'} to future readers.
            </p>

            {/* The Sealed Envelope Card */}
            <div className="flex justify-center">
              <motion.div
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label="Open author's confidential letter"
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsOpen(true);
                  }
                }}
                className="relative w-full max-w-md bg-gradient-to-b from-[#1c1a1a] via-[#141313] to-[#0e0d0d] border border-white/10 rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-8 sm:p-12 cursor-pointer group select-none overflow-hidden focus:outline-none focus:ring-1 focus:ring-[#c42b2b]/60"
              >
                {/* Envelope Flap triangular geometry */}
                <div
                  className="absolute top-0 left-0 right-0 h-16 border-b border-white/[0.06] bg-[#1a1818]/60"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  }}
                />

                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none" />

                {/* Wax Seal Centerpiece */}
                <div className="relative z-10 flex flex-col items-center pt-8 sm:pt-10">
                  <div className="relative mb-6">
                    {/* Pulsing ring */}
                    <div className="absolute -inset-2 rounded-full bg-[#c42b2b]/20 blur-md group-hover:bg-[#c42b2b]/40 transition-all duration-500 animate-pulse" />
                    
                    {/* The Wax Seal */}
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#d43737] via-[#a82222] to-[#751616] border-2 border-[#ff8585]/40 flex items-center justify-center shadow-[0_4px_25px_rgba(196,43,43,0.5)] group-hover:shadow-[0_4px_35px_rgba(196,43,43,0.7)] transition-all">
                      <span
                        className="text-[#f5f0e8] text-base font-bold tracking-widest"
                        style={{ fontFamily: '"Cormorant Garamond", serif' }}
                      >
                        AM
                      </span>
                    </div>
                  </div>

                  <p
                    className="text-xs uppercase tracking-[0.2em] text-[#f5f0e8] font-medium group-hover:text-[#c42b2b] transition-colors mb-1"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    Click to Break the Seal
                  </p>
                  <p
                    className="text-[10px] tracking-wider uppercase text-[#e8e0d4]/40"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    Unseal Author’s Letter
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Unfolded Letter Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#0a0a0a]/92 backdrop-blur-md"
            />

            {/* Parchment Letter Container */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Author's Letter"
              initial={{ opacity: 0, scale: 0.9, y: 35 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 35 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-2xl bg-[#141212] border border-[#f5f0e8]/15 rounded-sm shadow-[0_30px_100px_rgba(0,0,0,0.95)] max-h-[90vh] flex flex-col overflow-hidden select-text"
            >
              {/* Top red accent */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c42b2b] to-transparent" />

              {/* Close Button */}
              <div className="absolute top-5 right-5 z-20">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#f5f0e8]/40 hover:text-[#f5f0e8] p-1.5 rounded-full hover:bg-white/5 transition-colors"
                  aria-label="Close letter"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Letter Scrollable Body */}
              <div className="p-8 sm:p-14 overflow-y-auto">
                <div className="max-w-xl mx-auto">
                  {/* Letter Header */}
                  <div className="flex justify-between items-baseline border-b border-white/[0.06] pb-4 mb-8">
                    <span
                      className="text-xs uppercase tracking-[0.25em] text-[#c42b2b]"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      A Private Epilogue
                    </span>
                    <span
                      className="text-xs italic text-[#e8e0d4]/40"
                      style={{ fontFamily: '"Cormorant Garamond", serif' }}
                    >
                      Autumn • Writing Desk
                    </span>
                  </div>

                  {/* Salutation */}
                  <h3
                    className="text-2xl sm:text-3xl text-[#f5f0e8] mb-6 font-light"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    Dear Reader,
                  </h3>

                  {/* Letter Body Text */}
                  <div
                    className="space-y-6 text-[#e8e0d4]/85 leading-relaxed text-base sm:text-lg font-light"
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '1.22rem',
                      lineHeight: '1.9',
                    }}
                  >
                    <p>
                      I wrote this book because for a long time, I was that foolish boy.
                    </p>

                    <p>
                      We live in a world that constantly demands clarity, but love rarely arrives with an explanation. It arrives with an innocent glance, an unexplainable stillness, and promises that feel bigger than the universe itself.
                    </p>

                    <p>
                      When you love someone without seeing where it will lead, the cynical call it foolish. But I believe there is an unsung bravery in loving without an escape plan. To love blindly is not to lack sight; it is choosing to believe in the promise more than in the fear.
                    </p>

                    <p>
                      This story is not a warning against love—it is a quiet monument to having loved with an undefended heart.
                    </p>

                    <p>
                      If these pages ever find you during your own quiet season of heartbreak or waiting, I hope they remind you: you are not the first soul to have placed your faith in an uncertain forever, and you will not be the last.
                    </p>
                  </div>

                  {/* Sign-off */}
                  <div className="mt-12 pt-8 border-t border-white/[0.06]">
                    <p
                      className="text-sm italic text-[#e8e0d4]/60 mb-2"
                      style={{ fontFamily: '"Cormorant Garamond", serif' }}
                    >
                      With all my quiet devotion,
                    </p>
                    <p
                      className="text-3xl sm:text-4xl text-[#c42b2b] leading-none mb-2"
                      style={{ fontFamily: '"Great Vibes", cursive' }}
                    >
                      {bookConfig?.author || 'Abdul Mutallif'}
                    </p>
                    <p
                      className="text-[10px] uppercase tracking-[0.2em] text-[#e8e0d4]/35"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      Author of {bookConfig?.fullTitle || 'Promises'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Letter Footer */}
              <div className="px-8 py-4 bg-[#0e0d0d] border-t border-white/[0.06] text-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs uppercase tracking-[0.2em] text-[#f5f0e8]/50 hover:text-[#c42b2b] transition-colors"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  Close Letter
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
