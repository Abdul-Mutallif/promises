import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bookConfig from '../data/bookConfig';

export default function BurntLetterEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBurned, setIsBurned] = useState(false);
  const [isBurning, setIsBurning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleBurn = () => {
    setIsBurning(true);
    setTimeout(() => {
      setIsBurning(false);
      setIsBurned(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsBurned(false);
  };

  return (
    <>
      {/* Hidden Easter Egg Trigger in Footer Margins */}
      <section className="py-8 bg-[#0a0a0a] border-t border-white/[0.03] text-center select-none relative overflow-hidden">
        <div className="max-w-xl mx-auto px-6 flex flex-col items-center">
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-3.5 px-5 py-2.5 rounded-full bg-[#120f0f] border border-[#c42b2b]/25 hover:border-[#c42b2b]/70 transition-all duration-300 shadow-[0_0_15px_rgba(196,43,43,0.1)] hover:shadow-[0_0_25px_rgba(196,43,43,0.3)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c42b2b]"
            aria-label="Examine charred secret letter fragment"
          >
            {/* Glowing Ember Dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e63946] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#c42b2b]" />
            </span>

            <span
              className="text-[11px] tracking-[0.2em] uppercase text-[#e8e0d4]/50 group-hover:text-[#e8e0d4] transition-colors"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Secret Fragment • The Charred Postscript
            </span>

            <span className="text-xs text-[#c42b2b] opacity-60 group-hover:opacity-100 transition-opacity">
              ✦
            </span>
          </motion.button>
        </div>
      </section>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="burnt-letter-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Charred Letter Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`relative z-10 w-full max-w-lg p-8 sm:p-10 rounded-sm transition-all duration-700 ${
                isBurning ? 'blur-sm scale-95 opacity-50' : 'opacity-100'
              }`}
              style={{
                background: 'linear-gradient(145deg, #1f1412 0%, #150f0e 45%, #0d0a0a 100%)',
                border: '1px solid rgba(230, 57, 70, 0.3)',
                boxShadow:
                  '0 0 50px rgba(0, 0, 0, 0.9), inset 0 0 40px rgba(0, 0, 0, 0.9), 0 0 30px rgba(196, 43, 43, 0.2)',
              }}
            >
              {/* Burnt Charcoal / Ash Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e63946]/70 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close fragment"
                className="absolute top-4 right-4 text-[#e8e0d4]/40 hover:text-[#e8e0d4] p-1.5 rounded-full transition-colors"
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {!isBurned ? (
                <>
                  {/* Header Tag */}
                  <div className="text-center mb-6">
                    <span
                      id="burnt-letter-title"
                      className="text-[10px] uppercase tracking-[0.3em] text-[#e63946] font-medium block mb-1"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      Recovered Fragment • Burnt Draft
                    </span>
                    <span
                      className="text-xs italic text-[#e8e0d4]/40"
                      style={{ fontFamily: '"Cormorant Garamond", serif' }}
                    >
                      Found in the margins of Chapter 12
                    </span>
                  </div>

                  {/* Charred Quotation */}
                  <div className="relative my-6 px-3">
                    <span
                      aria-hidden="true"
                      className="absolute -top-5 -left-1 text-4xl text-[#c42b2b]/30 font-serif leading-none select-none"
                      style={{ fontFamily: '"Cormorant Garamond", serif' }}
                    >
                      “
                    </span>

                    <p
                      className="text-lg sm:text-xl text-[#f5f0e8]/90 italic leading-relaxed sm:leading-loose text-center font-light select-text"
                      style={{ fontFamily: '"Cormorant Garamond", serif' }}
                    >
                      I wrote this on the evening train before the rain started. I never sent it because
                      to send it would mean admitting that the boy who believed in forever was already
                      mourning tomorrow.
                    </p>

                    <p
                      className="text-base sm:text-lg text-[#e8e0d4]/70 italic leading-relaxed text-center font-light mt-4 select-text"
                      style={{ fontFamily: '"Cormorant Garamond", serif' }}
                    >
                      If you find these ashes, know that I did not stop loving you. I simply ran out of
                      ways to survive the promises we could not keep.
                    </p>
                  </div>

                  {/* Sign-off */}
                  <div className="text-center mt-8 pt-4 border-t border-white/[0.05]">
                    <p
                      className="text-2xl text-[#c42b2b]"
                      style={{ fontFamily: '"Great Vibes", cursive' }}
                    >
                      The Foolish Boy
                    </p>
                    <p
                      className="text-[10px] tracking-[0.2em] uppercase text-[#e8e0d4]/30 mt-1"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      From {bookConfig?.fullTitle || 'Promises'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-5 py-2 text-xs uppercase tracking-[0.15em] text-[#e8e0d4]/60 hover:text-[#e8e0d4] transition-colors"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      Keep Secret
                    </button>

                    <button
                      onClick={handleBurn}
                      className="group relative px-6 py-2 bg-[#261010] hover:bg-[#381414] border border-[#c42b2b]/40 hover:border-[#c42b2b] text-[#f5f0e8] text-xs uppercase tracking-[0.18em] transition-all flex items-center gap-2"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      <span className="text-[#e63946] group-hover:scale-125 transition-transform">🔥</span>
                      <span>Burn to Ashes</span>
                    </button>
                  </div>
                </>
              ) : (
                /* Ash State */
                <div className="text-center py-8">
                  <div className="text-4xl mb-4 opacity-50">💨</div>
                  <h4
                    className="text-xl sm:text-2xl text-[#f5f0e8] mb-3 italic"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    Reduced to Ashes
                  </h4>
                  <p
                    className="text-sm text-[#e8e0d4]/50 leading-relaxed max-w-xs mx-auto mb-8 font-light"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    Some words were never meant to be remembered. The confession has drifted into smoke.
                  </p>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 text-xs uppercase tracking-[0.15em] text-[#e8e0d4]/40 hover:text-[#e8e0d4] transition-colors"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      Recover Ashes
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-2 bg-[#c42b2b] text-[#f5f0e8] text-xs uppercase tracking-[0.15em] hover:bg-[#a82424] transition-colors"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
