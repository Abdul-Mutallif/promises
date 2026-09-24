import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bookConfig from '../data/bookConfig';

export default function BookReaderModal({ isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const pages = bookConfig.previewPages || [];
  const activePage = pages[currentPage];

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentPage < pages.length - 1) {
        setCurrentPage((prev) => prev + 1);
      }
      if (e.key === 'ArrowLeft' && currentPage > 0) {
        setCurrentPage((prev) => prev - 1);
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
  }, [isOpen, currentPage, pages.length, onClose]);

  return (
    <AnimatePresence>
      {isOpen && pages.length > 0 && activePage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-md"
          />

          {/* Modal Book Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Book Excerpt Reader"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl bg-[#141212] border border-[#f5f0e8]/10 rounded-sm shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Subtle top red accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c42b2b] to-transparent" />

            {/* Header */}
            <div className="px-6 sm:px-8 py-5 border-b border-[#f5f0e8]/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c42b2b] font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
                  Preview Excerpt
                </span>
                <span className="text-white/20">•</span>
                <span className="text-xs uppercase tracking-wider text-[#e8e0d4]/50" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                  {activePage.chapter}
                </span>
              </div>

              <button
                onClick={onClose}
                className="text-[#f5f0e8]/50 hover:text-[#f5f0e8] transition-colors p-1.5 rounded-full hover:bg-white/5"
                aria-label="Close reader"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Page Content */}
            <div className="p-8 sm:p-12 overflow-y-auto flex-1 select-text">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="max-w-xl mx-auto"
                >
                  {/* Title */}
                  <h3
                    className="text-2xl sm:text-3xl text-[#f5f0e8] mb-8 text-center"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}
                  >
                    {activePage.title}
                  </h3>

                  {/* Paragraphs */}
                  <div className="space-y-6">
                    {activePage.text.map((para, i) => (
                      <p
                        key={i}
                        className={`text-base sm:text-lg leading-relaxed text-[#e8e0d4]/80 ${
                          i === 0 ? 'first-letter:text-4xl first-letter:font-serif first-letter:text-[#c42b2b] first-letter:mr-2 first-letter:float-left first-letter:leading-none' : ''
                        }`}
                        style={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: '1.2rem',
                          lineHeight: '1.85',
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer / Page Navigation */}
            <div className="px-6 sm:px-8 py-4 border-t border-[#f5f0e8]/[0.06] bg-[#0f0e0e] flex items-center justify-between">
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className={`flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition-all ${
                  currentPage === 0
                    ? 'opacity-30 cursor-not-allowed text-[#f5f0e8]'
                    : 'text-[#f5f0e8] hover:text-[#c42b2b]'
                }`}
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Previous</span>
              </button>

              <span className="text-xs tracking-[0.2em] uppercase text-[#e8e0d4]/40" style={{ fontFamily: '"Inter", sans-serif' }}>
                Page {activePage.pageNumber} of {String(pages.length).padStart(2, '0')}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(pages.length - 1, p + 1))}
                disabled={currentPage === pages.length - 1}
                className={`flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition-all ${
                  currentPage === pages.length - 1
                    ? 'opacity-30 cursor-not-allowed text-[#f5f0e8]'
                    : 'text-[#f5f0e8] hover:text-[#c42b2b]'
                }`}
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                <span>Next</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
