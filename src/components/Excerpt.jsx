import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import bookConfig from '../data/bookConfig';
import BookReaderModal from './BookReaderModal';

const Excerpt = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  return (
    <>
      <section id="excerpt" className="py-28 px-6 relative bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <span className="block text-[#c42b2b] uppercase tracking-[0.25em] text-[11px] mb-4 font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
              READ AN EXCERPT
            </span>
            <h2
              className="text-3xl md:text-5xl text-[#f5f0e8]"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontStyle: 'italic' }}
            >
              A Glimpse Into the Story
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
            transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
            className="relative bg-[#141212]/90 backdrop-blur-sm border border-[#f5f0e8]/10 p-10 md:p-16 rounded-sm shadow-2xl"
          >
            <span
              className="absolute top-6 left-6 md:top-10 md:left-10 text-6xl md:text-8xl text-[#c42b2b] opacity-25 leading-none select-none"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              “
            </span>
            
            <div className="relative z-10 text-center">
              <span className="inline-block px-3 py-1 bg-white/[0.04] text-[#e8e0d4]/60 text-[10px] uppercase tracking-widest mb-8 rounded-full border border-white/[0.06]" style={{ fontFamily: '"Inter", sans-serif' }}>
                Sample Excerpt
              </span>
              
              <p
                className="italic text-xl md:text-2xl leading-relaxed text-[#e8e0d4]/90 mb-8 max-w-2xl mx-auto"
                style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300 }}
              >
                {bookConfig.excerpt}
              </p>
              
              <p className="text-[#c42b2b] text-xs tracking-[0.2em] uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>
                — {bookConfig?.previewPages?.[0]?.chapter || 'Chapter 1'}
              </p>
            </div>

            <div className="mt-12 text-center">
              <button 
                onClick={() => setIsReaderOpen(true)}
                className="px-8 py-3.5 border border-[#c42b2b] text-[#f5f0e8] hover:bg-[#c42b2b]/15 uppercase tracking-[0.15em] text-xs font-medium transition-all shadow-[0_0_20px_rgba(196,43,43,0.15)]"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Read Full Sample Chapter →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reader Modal */}
      <BookReaderModal isOpen={isReaderOpen} onClose={() => setIsReaderOpen(false)} />
    </>
  );
};

export default Excerpt;
