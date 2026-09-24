import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import bookConfig from '../data/bookConfig';

const AboutBook = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="about-book" className="py-24 md:py-32 bg-[#111111] text-[#f5f0e8]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="text-[#c42b2b] text-[11px] tracking-[0.3em] uppercase font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
              DISCOVER
            </span>
          </motion.div>

          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-5xl lg:text-6xl mb-12"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontStyle: 'italic' }}
          >
            What is {bookConfig?.title || 'Promises'} — {bookConfig?.subtitle || 'The Tale of a Foolish Boy'}?
          </motion.h2>

          <motion.p 
            variants={itemVariants} 
            className="max-w-3xl text-lg md:text-xl text-[#e8e0d4]/80 leading-relaxed mb-8"
            style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
          >
            {bookConfig?.bookDescription}
          </motion.p>

          <motion.p 
            variants={itemVariants} 
            className="max-w-3xl text-sm md:text-base text-[#e8e0d4]/50 leading-relaxed mb-16"
            style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
          >
            The book explores the nuanced landscape of human connection through themes of:
          </motion.p>

          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bookConfig?.themes?.map((theme) => (
              <motion.div 
                key={theme}
                variants={itemVariants}
                className="group relative p-8 border border-white/5 bg-[#161414]/70 hover:bg-[#1a1818] transition-colors duration-500 rounded-sm text-left overflow-hidden shadow-lg"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c42b2b]/5 rounded-full blur-2xl group-hover:bg-[#c42b2b]/10 transition-colors duration-500 translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="flex items-center mb-4 relative z-10">
                  <div className="w-2 h-2 rounded-full bg-[#c42b2b] mr-4 opacity-80"></div>
                  <h3 className="text-xl tracking-wide text-[#f5f0e8]" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}>{theme}</h3>
                </div>
                
                {/* Decorative line */}
                <div className="w-8 h-px bg-[#c42b2b]/30 group-hover:w-16 transition-all duration-500 relative z-10"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutBook;
