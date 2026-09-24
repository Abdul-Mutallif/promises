import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bookConfig from '../data/bookConfig';

export default function QuoteShareModal({ quote, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const shareText = `“${quote}”\n\n— ${bookConfig.fullTitle} by ${bookConfig.author}\n#Promises #TheTaleOfAFoolishBoy #MustRead #Literature`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: bookConfig.fullTitle,
          text: `“${quote}” — From ${bookConfig.fullTitle} by ${bookConfig.author}`,
          url: window.location.href,
        });
      } catch {
        // user cancelled or failed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 25 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-[#141212] border border-[#f5f0e8]/10 rounded-sm shadow-2xl p-6 sm:p-8 flex flex-col items-center"
          >
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#c42b2b] font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
                Shareable Quote Card
              </span>
              <button
                onClick={onClose}
                className="text-[#f5f0e8]/40 hover:text-[#f5f0e8] p-1 rounded-full transition-colors"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Social Card Preview */}
            <div className="w-full aspect-[4/5] bg-gradient-to-b from-[#1c1a1a] via-[#141313] to-[#0d0c0c] border border-white/[0.08] p-7 sm:p-8 flex flex-col justify-between rounded-sm relative overflow-hidden shadow-2xl select-none">
              {/* Subtle red background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#c42b2b]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Card Top: Book Brand */}
              <div className="text-center relative z-10">
                <h4
                  className="leading-none text-3xl sm:text-4xl"
                  style={{
                    fontFamily: '"Great Vibes", cursive',
                    color: '#c42b2b',
                    textShadow: '0 0 20px rgba(196,43,43,0.3)',
                  }}
                >
                  {bookConfig?.title || 'Promises'}
                </h4>
                <p
                  className="text-[9px] uppercase tracking-[0.25em] text-[#e8e0d4]/40 mt-1"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  {bookConfig.subtitle}
                </p>
              </div>

              {/* Card Middle: Quote */}
              <div className="my-auto text-center relative z-10 px-2">
                <span className="text-3xl text-[#c42b2b]/30 font-serif leading-none block mb-2" aria-hidden="true">“</span>
                <p
                  className="text-lg sm:text-xl text-[#f5f0e8] italic leading-relaxed"
                  style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300 }}
                >
                  {quote}
                </p>
              </div>

              {/* Card Bottom: Author & Publication */}
              <div className="text-center relative z-10 border-t border-white/[0.06] pt-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#e8e0d4]/60" style={{ fontFamily: '"Inter", sans-serif' }}>
                  {bookConfig?.author || 'Abdul Mutallif'}
                </p>
                <p className="text-[8px] uppercase tracking-[0.25em] text-[#c42b2b]/60 mt-0.5" style={{ fontFamily: '"Inter", sans-serif' }}>
                  Novel • {bookConfig?.publicationDisplay || 'Dec 2027'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={handleCopy}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-[#f5f0e8] text-xs uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[#4ade80]">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNativeShare}
                className="px-4 py-2.5 bg-[#c42b2b] hover:bg-[#a82424] text-[#f5f0e8] text-xs uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 font-medium"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
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
        </div>
      )}
    </AnimatePresence>
  );
}
