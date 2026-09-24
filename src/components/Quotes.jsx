import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import bookConfig from '../data/bookConfig';
import QuoteShareModal from './QuoteShareModal';

export default function Quotes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const quotes = bookConfig.quotes || [];
  
  useEffect(() => {
    if (quotes.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [quotes.length, currentIndex]);

  const handleCopyQuote = async () => {
    if (quotes.length === 0) return;
    try {
      await navigator.clipboard.writeText(`“${quotes[currentIndex]}” — From ${bookConfig.fullTitle} by ${bookConfig.author}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  if (quotes.length === 0) return null;

  return (
    <>
      <section className="py-32 md:py-40 bg-[#0d0c0c] text-[#f5f0e8] relative overflow-hidden flex flex-col items-center justify-center min-h-[65vh]">
        {/* Decorative Quote Mark Watermark */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] md:text-[450px] text-[#c42b2b]/[0.035] leading-none select-none pointer-events-none"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          “
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-12 w-full relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-center flex flex-col items-center"
          >
            <span className="text-[#c42b2b] text-[11px] uppercase tracking-[0.25em] font-medium block mb-4" style={{ fontFamily: '"Inter", sans-serif' }}>
              EXCERPTS & QUOTES
            </span>
            <div className="mb-12 inline-block px-3 py-1 bg-white/[0.03] border border-white/[0.08] rounded-full text-[10px] tracking-widest uppercase text-[#f5f0e8]/40" style={{ fontFamily: '"Inter", sans-serif' }}>
              From the Manuscript
            </div>

            {/* Quote Carousel Box */}
            <div className="relative min-h-[180px] md:min-h-[220px] w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="flex flex-col items-center justify-center w-full"
                >
                  <blockquote
                    className="text-2xl sm:text-3xl md:text-4xl text-center max-w-3xl leading-relaxed mb-6 text-[#f5f0e8]/95"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300 }}
                  >
                    “{quotes[currentIndex]}”
                  </blockquote>
                  <cite className="text-[#f5f0e8]/40 text-xs tracking-wider not-italic" style={{ fontFamily: '"Inter", sans-serif' }}>
                    — from <span className="text-[#e8e0d4]/65">{bookConfig.fullTitle}</span>
                  </cite>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Share / Copy Controls */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={handleCopyQuote}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] uppercase tracking-[0.15em] text-[#e8e0d4]/70 hover:text-[#f5f0e8] transition-all rounded-sm"
                style={{ fontFamily: '"Inter", sans-serif' }}
                title="Copy quote text"
              >
                {copied ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[#4ade80]">Copied</span>
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>Copy Quote</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#c42b2b]/15 hover:bg-[#c42b2b]/25 border border-[#c42b2b]/40 text-[11px] uppercase tracking-[0.15em] text-[#f5f0e8] transition-all rounded-sm"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                <span>Share Card</span>
              </button>
            </div>

            {/* Navigation Dots */}
            {quotes.length > 1 && (
              <div className="flex gap-2.5 mt-10">
                {quotes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-current={idx === currentIndex ? 'true' : undefined}
                    className={`h-1.5 rounded-full transition-all duration-400 ${
                      idx === currentIndex 
                        ? "bg-[#c42b2b] w-7" 
                        : "bg-white/15 hover:bg-white/30 w-1.5"
                    }`}
                    aria-label={`Go to quote ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Share Modal */}
      <QuoteShareModal
        quote={quotes[currentIndex]}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </>
  );
}
