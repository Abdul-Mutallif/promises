import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import bookConfig from '../data/bookConfig';

export default function Author() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="author" className="py-28 bg-[#0a0a0a] text-[#f5f0e8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row gap-16 items-center"
        >
          {/* Left Column: Portrait Frame */}
          <motion.div variants={itemVariants} className="w-full md:w-5/12">
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#c42b2b]/15 to-transparent blur-2xl rounded-sm"></div>
              <div className="relative h-full w-full bg-[#141212] border border-[#f5f0e8]/[0.08] rounded-sm flex flex-col items-center justify-center p-8 text-center overflow-hidden shadow-2xl">
                {/* Initial Monogram */}
                <div
                  className="text-6xl text-[#f5f0e8]/15 mb-6 select-none"
                  style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300 }}
                  aria-hidden="true"
                >
                  {bookConfig?.author ? bookConfig.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'AM'}
                </div>
                <div className="w-8 h-[1px] bg-[#c42b2b]/40 mb-4" />
                <p className="text-[11px] tracking-[0.2em] text-[#f5f0e8]/40 uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>
                  Author portrait coming soon
                </p>
                <div className="absolute inset-0 border border-[#c42b2b]/10 pointer-events-none rounded-sm"></div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div variants={itemVariants} className="w-full md:w-7/12 flex flex-col justify-center">
            <div className="mb-4">
              <span className="text-[#c42b2b] text-[11px] uppercase tracking-[0.25em] font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
                THE AUTHOR
              </span>
            </div>
            
            <h2
              className="text-4xl md:text-5xl lg:text-6xl mb-8 text-[#f5f0e8]"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}
            >
              {bookConfig?.author}
            </h2>
            
            <div className="space-y-6 text-[#e8e0d4]/70 text-base md:text-lg leading-relaxed mb-12" style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}>
              {(bookConfig?.authorBio || '').split('\n\n').map((paragraph, index) => (
                <p key={paragraph.slice(0, 32) || index}>{paragraph}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-[#f5f0e8]/[0.08]">
              <div>
                <h3 className="text-[#c42b2b] text-[10px] uppercase tracking-[0.2em] mb-2 font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
                  Based in
                </h3>
                <p className="text-[#f5f0e8] text-lg" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}>
                  {bookConfig?.authorLocation}
                </p>
              </div>
              <div>
                <h3 className="text-[#c42b2b] text-[10px] uppercase tracking-[0.2em] mb-2 font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
                  Writing
                </h3>
                <p className="text-[#f5f0e8] text-lg" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}>
                  {typeof bookConfig?.authorGenres === 'string' ? bookConfig.authorGenres.split(' / ').join(', ') : (Array.isArray(bookConfig?.authorGenres) ? bookConfig.authorGenres.join(', ') : (bookConfig?.authorGenres || ''))}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
