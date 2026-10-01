import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import bookConfig from '../data/bookConfig';
import authorPhoto from '../assets/author.png';

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
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto group">
              {/* Ambient Crimson Glow behind portrait */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#c42b2b]/20 via-transparent to-transparent blur-2xl rounded-sm transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative h-full w-full bg-[#141212] border border-[#f5f0e8]/[0.08] rounded-sm overflow-hidden shadow-2xl">
                {/* Author Photograph */}
                <img
                  src={authorPhoto}
                  alt={bookConfig?.author || 'Abdul Mutallif'}
                  className="w-full h-full object-cover object-center filter grayscale contrast-[1.05] brightness-95 transition-all duration-700 group-hover:scale-105 group-hover:contrast-110"
                  loading="lazy"
                />

                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-black/20 pointer-events-none" />

                {/* Subtle Crimson Accent Border line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c42b2b]/60 to-transparent" />
                <div className="absolute inset-0 border border-[#c42b2b]/15 pointer-events-none rounded-sm transition-colors duration-500 group-hover:border-[#c42b2b]/40" />

                {/* Bottom author title tag overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#f5f0e8]/70 backdrop-blur-sm bg-black/50 px-3.5 py-1.5 rounded-sm border border-white/5 pointer-events-none">
                  <span style={{ fontFamily: '"Inter", sans-serif' }}>{bookConfig?.author || 'Abdul Mutallif'}</span>
                  <span className="text-[#c42b2b]">Author</span>
                </div>
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
