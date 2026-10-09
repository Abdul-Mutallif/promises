import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import bookConfig from '../data/bookConfig';

const Story = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedBeatIndex, setSelectedBeatIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } }
  };

  const beats = bookConfig?.storyBeats || [];
  const activeBeat = beats[selectedBeatIndex] || beats[0] || null;

  return (
    <section id="story" className="py-28 md:py-36 bg-[#0a0a0a] text-[#f5f0e8] relative overflow-hidden" ref={ref}>
      {/* Decorative background quote mark */}
      <div
        aria-hidden="true"
        className="absolute top-12 left-8 text-[18rem] md:text-[24rem] text-[#c42b2b]/[0.035] select-none pointer-events-none leading-none"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
      >
        “
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center"
        >
          {/* Section Label */}
          <motion.div variants={itemVariants} className="mb-5 text-center">
            <span className="text-[#c42b2b] text-[11px] tracking-[0.3em] uppercase font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
              THE STORY
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-5xl lg:text-6xl mb-20 text-center"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontStyle: 'italic' }}
          >
            A Story About What We Cannot See
          </motion.h2>

          {/* Cinematic Quotes Section */}
          <div className="w-full max-w-4xl mx-auto space-y-12 mb-28">
            {bookConfig?.storyQuotes?.map((quote) => (
              <motion.div 
                key={quote}
                variants={itemVariants}
                className="relative p-8 md:p-12 border-l border-[#c42b2b]/50 bg-gradient-to-r from-[#141212]/90 to-transparent shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-3 -left-3 text-4xl text-[#c42b2b]/30 leading-none select-none"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  “
                </div>
                <p
                  className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-[#e8e0d4]/90"
                  style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300 }}
                >
                  {quote}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Interactive Story Progression Timeline */}
          <motion.div variants={itemVariants} className="w-full mt-4">
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-[0.2em] text-[#e8e0d4]/40" style={{ fontFamily: '"Inter", sans-serif' }}>
                Interactive Journey • Click any phase to explore
              </span>
            </div>

            {/* Timeline Nodes */}
            <div className="relative mb-12 sm:mb-16">
              {/* Connecting Line Track — dead-centered vertically and horizontally */}
              <div className="absolute top-6 left-[10%] right-[10%] -translate-y-1/2 h-[1px] bg-white/[0.08] pointer-events-none z-0">
                {/* Active highlighted crimson line connecting up to current phase */}
                <div
                  className="h-full bg-gradient-to-r from-[#c42b2b] via-[#e63946] to-[#c42b2b] transition-all duration-500 shadow-[0_0_12px_rgba(230,57,70,0.6)]"
                  style={{ width: `${(selectedBeatIndex / Math.max(1, beats.length - 1)) * 100}%` }}
                />
              </div>

              <div 
                role="tablist"
                aria-label="Story progression phases"
                className="grid grid-cols-5 relative z-10"
              >
                {beats.map((beat, idx) => {
                  const isActive = idx === selectedBeatIndex;
                  return (
                    <button
                      key={beat.phase || beat.label || idx}
                      role="tab"
                      id={`story-tab-${idx}`}
                      aria-selected={isActive}
                      aria-controls={`story-phase-panel-${idx}`}
                      onClick={() => setSelectedBeatIndex(idx)}
                      className="flex flex-col items-center text-center px-1 sm:px-2 focus:outline-none group cursor-pointer"
                    >
                      {/* Icon Node Container with fixed 48px height for exact line-center alignment */}
                      <div className="h-12 w-full flex items-center justify-center mb-2 sm:mb-3">
                        <div
                          className={`w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-400 ${
                            isActive
                              ? 'bg-[#c42b2b] text-[#f5f0e8] shadow-[0_0_25px_rgba(196,43,43,0.7)] border border-[#ff6b6b] scale-110 sm:scale-115'
                              : 'bg-[#141414] border border-white/10 group-hover:border-[#c42b2b]/50 text-[#e8e0d4]/70 group-hover:text-[#f5f0e8]'
                          }`}
                        >
                          <span className="text-xs sm:text-sm md:text-base" aria-hidden="true">{beat.icon}</span>
                        </div>
                      </div>

                      {/* Label */}
                      <h4
                        className={`text-[11px] sm:text-sm md:text-base leading-tight mb-1 transition-colors ${
                          isActive ? 'text-[#f5f0e8] font-medium' : 'text-[#e8e0d4]/60 group-hover:text-[#e8e0d4]'
                        }`}
                        style={{ fontFamily: '"Cormorant Garamond", serif' }}
                      >
                        {beat.label}
                      </h4>

                      {/* Phase Indicator */}
                      <span
                        className={`text-[8px] sm:text-[9px] md:text-[10px] tracking-wider uppercase transition-colors ${
                          isActive ? 'text-[#c42b2b] font-medium' : 'text-white/20'
                        }`}
                        style={{ fontFamily: '"Inter", sans-serif' }}
                      >
                        <span className="hidden sm:inline">{beat.phase || `Phase 0${idx + 1}`}</span>
                        <span className="sm:hidden">{`0${idx + 1}`}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Expanded Active Phase Card (Scrapbook Spread) */}
            {activeBeat && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedBeatIndex}
                  role="tabpanel"
                  id={`story-phase-panel-${selectedBeatIndex}`}
                  aria-labelledby={`story-tab-${selectedBeatIndex}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="max-w-4xl mx-auto bg-[#f5f0e8] text-[#1a1a1a] p-8 sm:p-10 md:p-14 rounded-sm relative shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                  style={{
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
                  }}
                >
                  <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start relative">
                    
                    {/* Polaroid Photo */}
                    <div className="relative flex-shrink-0 w-48 sm:w-56 -rotate-2 transform hover:rotate-0 transition-transform duration-500 z-10">
                      {/* Washi Tape */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/50 backdrop-blur-sm rotate-3 z-20 shadow-sm" style={{ clipPath: 'polygon(5% 0%, 95% 2%, 100% 98%, 0% 100%)' }} />
                      
                      <div className="bg-white p-3 sm:p-4 pb-12 sm:pb-16 shadow-xl relative">
                        <div className="bg-[#141212] aspect-square w-full flex items-center justify-center text-4xl sm:text-6xl text-[#c42b2b]">
                          {activeBeat.icon}
                        </div>
                        <div className="absolute bottom-3 sm:bottom-4 left-0 w-full text-center">
                          <span className="text-xs sm:text-sm uppercase tracking-widest text-black/60 font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
                            {activeBeat.phase}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Scrapbook Details */}
                    <div className="flex flex-col gap-6 w-full relative z-10">
                      {/* Torn paper note for quote */}
                      <div className="relative bg-white/60 p-6 md:p-8 shadow-md transform rotate-1">
                        {/* Washi Tape */}
                        <div className="absolute -top-3 -right-2 w-16 h-5 bg-[#c42b2b]/30 backdrop-blur-sm -rotate-6 z-20 shadow-sm" style={{ clipPath: 'polygon(0% 5%, 98% 0%, 100% 95%, 2% 100%)' }} />
                        <div className="absolute -bottom-3 -left-2 w-16 h-5 bg-[#c42b2b]/30 backdrop-blur-sm -rotate-6 z-20 shadow-sm" style={{ clipPath: 'polygon(0% 5%, 98% 0%, 100% 95%, 2% 100%)' }} />
                        
                        <blockquote
                          className="text-xl sm:text-2xl md:text-3xl text-[#1a1a1a] leading-relaxed"
                          style={{ fontFamily: '"Great Vibes", cursive' }}
                        >
                          “{activeBeat.quote}”
                        </blockquote>
                        <div className="mt-4 text-right">
                          <span className="text-xs uppercase tracking-widest text-[#c42b2b] font-bold font-sans">
                            {activeBeat.label} • {activeBeat.subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Typewriter detail */}
                      <div className="pl-2 border-l-2 border-black/10 mt-2">
                        <p
                          className="text-sm sm:text-base text-[#333] leading-relaxed"
                          style={{ fontFamily: '"Courier New", Courier, monospace' }}
                        >
                          {activeBeat.detail}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Navigation Stepper (Scrapbook styled) */}
                  <div className="flex items-center justify-between pt-6 mt-10 border-t border-black/10 relative z-10">
                    <button
                      onClick={() => setSelectedBeatIndex(Math.max(0, selectedBeatIndex - 1))}
                      disabled={selectedBeatIndex === 0}
                      className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] transition-colors py-1 ${
                        selectedBeatIndex === 0
                          ? 'opacity-30 cursor-not-allowed text-[#1a1a1a]'
                          : 'text-[#1a1a1a] hover:text-[#c42b2b]'
                      }`}
                      style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600 }}
                    >
                      <span aria-hidden="true">←</span>
                      <span>Previous</span>
                    </button>

                    <span className="text-[10px] tracking-[0.2em] uppercase text-black/40 font-bold" style={{ fontFamily: '"Inter", sans-serif' }}>
                      Phase 0{selectedBeatIndex + 1} of 0{beats.length}
                    </span>

                    <button
                      onClick={() => setSelectedBeatIndex(Math.min(beats.length - 1, selectedBeatIndex + 1))}
                      disabled={selectedBeatIndex === beats.length - 1}
                      className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] transition-colors py-1 ${
                        selectedBeatIndex === beats.length - 1
                          ? 'opacity-30 cursor-not-allowed text-[#1a1a1a]'
                          : 'text-[#1a1a1a] hover:text-[#c42b2b]'
                      }`}
                      style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600 }}
                    >
                      <span>Next</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;
