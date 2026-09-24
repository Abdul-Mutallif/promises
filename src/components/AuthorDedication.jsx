import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import bookConfig from '../data/bookConfig';

export default function AuthorDedication() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 md:py-28 bg-[#0a0a0a] text-[#f5f0e8] relative overflow-hidden" ref={ref}>
      {/* Subtle radial ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(circle,rgba(196,43,43,0.045)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="relative bg-gradient-to-b from-[#161414] via-[#121111] to-[#0d0c0c] border border-[#f5f0e8]/[0.08] p-8 sm:p-12 md:p-16 rounded-sm text-center shadow-[0_25px_70px_rgba(0,0,0,0.8)]"
        >
          {/* Top Wax Seal / Crest Emblem */}
          <div aria-hidden="true" className="w-12 h-12 rounded-full mx-auto -mt-14 sm:-mt-18 mb-8 bg-[#181213] border-2 border-[#c42b2b]/60 flex items-center justify-center shadow-[0_0_25px_rgba(196,43,43,0.35)] relative">
            <span
              className="text-sm font-semibold text-[#c42b2b] tracking-widest select-none"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              {bookConfig?.author ? bookConfig.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'AM'}
            </span>
          </div>

          {/* Section Sub-header */}
          <span
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c42b2b] font-medium block mb-6 select-none"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            THE DEDICATION
          </span>

          {/* Opening quotation glyph */}
          <span
            aria-hidden="true"
            className="text-4xl sm:text-5xl text-[#c42b2b]/40 font-serif leading-none block mb-4 select-none"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            "
          </span>

          {/* Dedication Text */}
          <blockquote
            className="text-xl sm:text-2xl md:text-3xl text-[#f5f0e8]/95 leading-relaxed sm:leading-loose mb-8 font-light italic max-w-2xl mx-auto"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            To anyone who ever loved someone more than they loved themselves, and learned too late that a promise cannot build a home out of thin air.
          </blockquote>

          {/* Divider */}
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#c42b2b]/50 to-transparent mx-auto mb-6" />

          {/* Author Signature */}
          <p
            className="text-2xl sm:text-3xl text-[#c42b2b] mb-2 leading-none"
            style={{ fontFamily: '"Great Vibes", cursive' }}
          >
            {bookConfig?.author || 'Abdul Mutallif'}
          </p>

          <p
            className="text-[11px] uppercase tracking-[0.2em] text-[#e8e0d4]/40"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            From the preface of {bookConfig?.fullTitle || 'Promises: The Tale of a Foolish Boy'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
