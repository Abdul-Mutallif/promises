import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';
import bookConfig from '../data/bookConfig';

// A single page component for the flipbook
const Page = React.forwardRef((props, ref) => {
  const { page, number, total } = props;
  return (
    <div className="demoPage overflow-hidden bg-[#f5f0e8]" ref={ref}>
      <div className="w-full h-full relative text-[#1a1a1a] shadow-inner">
        {/* Background paper texture */}
        <div 
          className="absolute inset-0 opacity-[0.85] pointer-events-none"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
        />
        
        {/* Page Content - Padding goes here! */}
        <div className="p-6 md:p-10 h-full flex flex-col relative z-10">
          <div className="mb-6 text-center border-b border-black/10 pb-4 mt-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c42b2b] font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
              {page.chapter}
            </span>
            <h3
              className="text-xl sm:text-2xl mt-2"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 }}
            >
              {page.title}
            </h3>
          </div>

          <div className="space-y-4 flex-1 overflow-hidden">
            {page.text.map((para, i) => (
              <p
                key={i}
                className={`text-sm sm:text-base leading-relaxed text-[#1a1a1a]/90 ${
                  i === 0 ? 'first-letter:text-3xl first-letter:font-serif first-letter:text-[#c42b2b] first-letter:mr-1 first-letter:float-left first-letter:leading-none' : ''
                }`}
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  lineHeight: '1.7',
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Page Footer */}
          <div className="mt-4 text-center border-t border-black/10 pt-4 mb-2">
            <span className="text-xs tracking-[0.2em] uppercase text-black/40" style={{ fontFamily: '"Inter", sans-serif' }}>
              {number}
            </span>
          </div>
        </div>
        
        {/* Page drop shadow for 3D effect */}
        <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
      </div>
    </div>
  );
});

export default function BookReaderModal({ isOpen, onClose }) {
  const pages = bookConfig.previewPages || [];
  const bookRef = useRef();

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && bookRef.current) {
        bookRef.current.pageFlip().turnNext();
      }
      if (e.key === 'ArrowLeft' && bookRef.current) {
        bookRef.current.pageFlip().turnPrev();
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
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && pages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Book Excerpt Reader"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-5xl flex flex-col items-center"
          >
            {/* Close Button */}
            <div className="w-full flex justify-end mb-4">
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest text-xs"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                <span>Close Book</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* The 3D Book */}
            <div className="shadow-[0_40px_100px_rgba(0,0,0,0.9)] border-4 border-[#141212] rounded-md bg-[#141212]">
              <HTMLFlipBook
                width={400}
                height={600}
                size="stretch"
                minWidth={300}
                maxWidth={450}
                minHeight={400}
                maxHeight={650}
                maxShadowOpacity={0.5}
                showCover={false}
                mobileScrollSupport={true}
                className="book-flip"
                ref={bookRef}
                flippingTime={1000}
                usePortrait={false}
              >
                {/* Inner Pages */}
                {pages.map((page, i) => (
                  <Page key={i} page={page} number={i + 1} total={pages.length} />
                ))}

                {/* Back Cover / End Page to balance the spread */}
                <div className="demoPage overflow-hidden bg-[#0a0a0a]">
                  <div className="w-full h-full flex items-center justify-center border-l border-white/5 relative">
                     <div className="absolute inset-0 bg-gradient-to-bl from-[#1a1a1a] to-black opacity-50" />
                     <div className="text-center relative z-10">
                       <div className="text-[#c42b2b] text-4xl mb-4">♦</div>
                       <p className="text-white/40 tracking-widest text-xs uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>End of Preview</p>
                     </div>
                  </div>
                </div>
              </HTMLFlipBook>
            </div>
            
            <div className="mt-8 text-center">
               <p className="text-white/40 text-xs tracking-widest uppercase font-sans">
                  Click and drag corners to flip pages • Use arrow keys
               </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
