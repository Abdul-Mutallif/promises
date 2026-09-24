import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import bookConfig from '../data/bookConfig';
import BookReaderModal from './BookReaderModal';

const BookCover = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  // Mouse tilt animation physics
  const bookBoxRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Default tilt is -15deg on Y, 3deg on X
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-24, -6]);
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -4]);
  const glareOpacity = useTransform(smoothMouseX, [-0.5, 0, 0.5], [0.35, 0.1, 0.25]);
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ['-20%', '120%']);

  const handleMouseMove = (e) => {
    if (!bookBoxRef.current) return;
    const rect = bookBoxRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] } }
  };

  return (
    <>
      <section id="book" className="py-28 md:py-36 bg-[#0a0a0a] text-[#f5f0e8] overflow-hidden" ref={ref}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28 items-center">
            
            {/* Left Column - Interactive 3D Tilt Book */}
            <div
              ref={bookBoxRef}
              role="button"
              tabIndex={0}
              aria-label="Open book preview reader"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsReaderOpen(true);
                }
              }}
              className="flex flex-col justify-center items-center cursor-pointer group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c42b2b]"
              style={{ perspective: "1200px" }}
              onClick={() => setIsReaderOpen(true)}
            >
              <motion.div
                initial={{ y: -6 }}
                animate={{ y: [6, -6] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 5,
                  ease: "easeInOut"
                }}
                style={{
                  transformStyle: "preserve-3d",
                  rotateY,
                  rotateX,
                }}
                className="relative w-[260px] sm:w-[310px] h-[400px] sm:h-[470px]"
              >
                {/* Dynamic Shadow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-[#c42b2b]/15 blur-2xl rounded-full transition-opacity group-hover:opacity-100" />
                
                {/* Book Front Cover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1c1b1b] via-[#141313] to-[#0c0c0c] rounded-r-md rounded-l-sm shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/[0.06] overflow-hidden flex flex-col justify-between p-8 select-none">
                  {/* Red accent line at top */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c42b2b] to-transparent opacity-80" />
                  
                  {/* Dynamic Sheen / Foil Glare */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)',
                      opacity: glareOpacity,
                      x: glareX,
                    }}
                  />

                  {/* Inner border frame */}
                  <div className="absolute inset-5 border border-[rgba(245,240,232,0.06)] pointer-events-none" />

                  {/* Title area */}
                  <div className="mt-12 text-center relative z-10">
                    <h2
                      className="mb-4 leading-none"
                      style={{
                        fontFamily: '"Great Vibes", cursive',
                        fontSize: 'clamp(3rem, 8.5vw, 3.8rem)',
                        color: '#c42b2b',
                        textShadow: '0 0 35px rgba(196, 43, 43, 0.3)',
                      }}
                    >
                      {bookConfig?.title || 'Promises'}
                    </h2>
                    <p
                      className="tracking-[0.14em] uppercase"
                      style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '0.85rem',
                        color: '#e8e0d4',
                        fontWeight: 300,
                        letterSpacing: '0.18em',
                      }}
                    >
                      {bookConfig?.subtitle || 'The Tale of a Foolish Boy'}
                    </p>
                  </div>

                  {/* Author at bottom */}
                  <div className="mb-2 text-center relative z-10">
                    <div className="w-8 h-[1px] bg-[#c42b2b]/40 mx-auto mb-4" />
                    <p className="text-[10px] tracking-[0.25em] uppercase text-[#e8e0d4]/45" style={{ fontFamily: '"Inter", sans-serif' }}>
                      {bookConfig?.author || 'Abdul Mutallif'}
                    </p>
                  </div>
                  
                  {/* Spine effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-black/80 to-transparent" />
                </div>
              </motion.div>

              {/* Interactive Peek Inside Hint Button */}
              <div className="mt-10 flex items-center gap-2.5 text-xs uppercase tracking-[0.18em] text-[#e8e0d4]/70 group-hover:text-[#c42b2b] transition-all bg-[#141414] border border-[#f5f0e8]/10 group-hover:border-[#c42b2b]/40 px-5 py-2.5 rounded-full shadow-lg">
                <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span>Peek Inside (Sample Chapter)</span>
              </div>
            </div>

            {/* Right Column - Description */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-col justify-center"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <span className="text-[#c42b2b] text-[11px] tracking-[0.3em] font-medium uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>
                  THE BOOK
                </span>
              </motion.div>
              
              <motion.h2
                variants={itemVariants}
                className="mb-4 leading-tight"
                style={{
                  fontFamily: '"Great Vibes", cursive',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  color: '#c42b2b',
                }}
              >
                {bookConfig?.title || 'Promises'}
              </motion.h2>

              <motion.h3
                variants={itemVariants}
                className="mb-10 tracking-[0.12em] uppercase"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                  color: '#e8e0d4',
                  fontWeight: 300,
                  letterSpacing: '0.15em',
                }}
              >
                {bookConfig?.subtitle || 'The Tale of a Foolish Boy'}
              </motion.h3>

              <motion.div variants={itemVariants} className="space-y-4 mb-8">
                {bookConfig?.coverTagline?.map((line) => (
                  <p
                    key={line}
                    className="leading-relaxed"
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '1.2rem',
                      color: 'rgba(232, 224, 212, 0.6)',
                      fontStyle: 'italic',
                      fontWeight: 300,
                    }}
                  >
                    {line}
                  </p>
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="mb-10">
                <button
                  onClick={() => setIsReaderOpen(true)}
                  className="inline-flex items-center gap-3 px-6 py-3 border border-[#c42b2b]/50 hover:bg-[#c42b2b]/10 text-[#f5f0e8] text-xs uppercase tracking-[0.15em] transition-all"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  <span>Read Prologue & Chapter I</span>
                  <span aria-hidden="true">→</span>
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="w-full h-[1px] bg-white/[0.06] mb-10" />

              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6">
                {[
                  {
                    label: 'Format',
                    value: typeof bookConfig?.format === 'string'
                      ? bookConfig.format.split(' / ').join(', ')
                      : (Array.isArray(bookConfig?.format) ? bookConfig.format.join(', ') : (bookConfig?.format || 'Paperback / eBook'))
                  },
                  { label: 'Language', value: bookConfig?.language || 'English' },
                  { label: 'Status', value: bookConfig?.status || 'Coming Soon' },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#e8e0d4]/30 mb-2" style={{ fontFamily: '"Inter", sans-serif' }}>
                      {item.label}
                    </p>
                    <p className="text-sm text-[#e8e0d4]/80" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reader Modal */}
      <BookReaderModal isOpen={isReaderOpen} onClose={() => setIsReaderOpen(false)} />
    </>
  );
};

export default BookCover;
