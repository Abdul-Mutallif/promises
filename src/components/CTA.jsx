import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import bookConfig from '../data/bookConfig';

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="py-36 px-6 relative bg-gradient-to-b from-[#0a0a0a] via-[#0d0809] to-[#0a0a0a] overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(196,43,43,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2
            className="mb-8"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#f5f0e8',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.3,
            }}
          >
            The story is coming.
          </h2>
          
          <p
            className="mb-14 max-w-xl mx-auto"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.15rem',
              color: 'rgba(232, 224, 212, 0.5)',
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            Follow the journey of <em className="text-[#f5f0e8]/70">{bookConfig.fullTitle}</em> and be the first to know when the book is published.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.a
              href="#newsletter"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-9 py-3.5 bg-[#c42b2b] text-[#f5f0e8] uppercase tracking-[0.15em] text-xs font-medium transition-all duration-500 hover:shadow-[0_0_30px_rgba(196,43,43,0.3)]"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Get Publication Updates
            </motion.a>
            
            <div className="w-full sm:w-auto flex flex-col items-center">
              <button
                disabled
                className="w-full sm:w-auto px-9 py-3.5 border border-[#f5f0e8]/10 text-[#f5f0e8]/30 cursor-not-allowed uppercase tracking-[0.15em] text-xs"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Buy the Book
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
