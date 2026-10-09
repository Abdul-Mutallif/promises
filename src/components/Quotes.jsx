import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import bookConfig from '../data/bookConfig';
import QuoteShareModal from './QuoteShareModal';

const quotes = [
  ...bookConfig.quotes,
  ...bookConfig.storyQuotes,
  ...bookConfig.previewPages.flatMap(p => p.text.filter(t => t.length > 50 && t.length < 150))
];

export default function Quotes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const [activeQuote, setActiveQuote] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const generateQuote = () => {
    if (isGenerating || quotes.length === 0) return;
    setIsGenerating(true);
    setActiveQuote(null);
    setCopied(false);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setActiveQuote(quotes[randomIndex]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopyQuote = async () => {
    if (!activeQuote) return;
    try {
      await navigator.clipboard.writeText(`“${activeQuote}” — From ${bookConfig.fullTitle} by ${bookConfig.author}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  if (quotes.length === 0) return null;

  return (
    <>
      <section className="py-24 md:py-36 bg-[#050505] text-[#f5f0e8] relative overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,43,43,0.03)_0%,transparent_50%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 sm:px-12 w-full relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1 }}
            className="text-center flex flex-col items-center"
          >
            <span className="text-[#c42b2b] text-[11px] uppercase tracking-[0.25em] font-medium block mb-4" style={{ fontFamily: '"Inter", sans-serif' }}>
              EXCERPTS & QUOTES
            </span>
            <div className="mb-12 inline-block px-3 py-1 bg-white/[0.03] border border-white/[0.08] rounded-full text-[10px] tracking-widest uppercase text-[#f5f0e8]/40" style={{ fontFamily: '"Inter", sans-serif' }}>
              From the Manuscript
            </div>

            {/* The Orb / Button */}
            <motion.button
              onClick={generateQuote}
              disabled={isGenerating}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[#c42b2b]/30 bg-[#0a0a0a] flex items-center justify-center shadow-[0_0_30px_rgba(196,43,43,0.15)] hover:shadow-[0_0_50px_rgba(196,43,43,0.3)] transition-all cursor-pointer group mb-4"
            >
              <div className="absolute inset-2 rounded-full border border-white/5 bg-gradient-to-br from-[#1a1a1a] to-[#050505] flex items-center justify-center overflow-hidden">
                <div className={`absolute inset-0 bg-[#c42b2b]/20 blur-xl transition-opacity duration-700 ${isGenerating ? 'opacity-100 animate-pulse' : 'opacity-0 group-hover:opacity-50'}`} />
                
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={isGenerating ? "#f5f0e8" : "#c42b2b"} strokeWidth="1" className={`transition-colors duration-500 ${isGenerating ? 'animate-spin' : ''}`}>
                  <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" strokeLinecap="round"/>
                </svg>
              </div>
            </motion.button>
            
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-8" style={{ fontFamily: '"Inter", sans-serif' }}>
              {isGenerating ? "Consulting the ashes..." : "Touch to reveal"}
            </p>

            {/* Quote Display Box */}
            <div className="relative min-h-[220px] w-full flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {activeQuote && !isGenerating && (
                  <motion.div
                    key={activeQuote}
                    initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -15, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center w-full"
                  >
                    <blockquote
                      className="text-2xl sm:text-3xl md:text-4xl text-center max-w-3xl leading-relaxed mb-6 text-[#f5f0e8]/95"
                      style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300 }}
                    >
                      “{activeQuote}”
                    </blockquote>
                    <cite className="text-[#f5f0e8]/40 text-xs tracking-wider not-italic" style={{ fontFamily: '"Inter", sans-serif' }}>
                      — from <span className="text-[#e8e0d4]/65">{bookConfig.fullTitle}</span>
                    </cite>

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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Share Modal */}
      <QuoteShareModal
        quote={activeQuote || ""}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </>
  );
}
