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

            {/* Expanded Active Phase Card */}
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
                  className="max-w-3xl mx-auto bg-[#141212] border border-[#f5f0e8]/[0.08] p-6 sm:p-8 md:p-12 rounded-sm relative overflow-hidden shadow-2xl"
                >
                  <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-[#c42b2b]" />

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2 mb-4 sm:mb-6">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#c42b2b] font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
                      {activeBeat.phase} • {activeBeat.label}
                    </span>
                    <span className="text-xs sm:text-sm italic text-[#e8e0d4]/50" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                      {activeBeat.subtitle}
                    </span>
                  </div>

                  {/* Scene Quote */}
                  <blockquote
                    className="text-lg sm:text-xl md:text-2xl text-[#f5f0e8] leading-relaxed mb-4 sm:mb-6 italic"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    “{activeBeat.quote}”
                  </blockquote>

                  {/* Detail */}
                  <p
                    className="text-xs sm:text-sm md:text-base text-[#e8e0d4]/65 leading-relaxed"
                    style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
                  >
                    {activeBeat.detail}
                  </p>

                  {/* Mobile & Desktop Stepper Navigation Footer */}
                  <div className="flex items-center justify-between pt-5 mt-6 border-t border-white/[0.06]">
                    <button
                      onClick={() => setSelectedBeatIndex(Math.max(0, selectedBeatIndex - 1))}
                      disabled={selectedBeatIndex === 0}
                      className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] transition-colors py-1 ${
                        selectedBeatIndex === 0
                          ? 'opacity-20 cursor-not-allowed text-[#f5f0e8]'
                          : 'text-[#e8e0d4]/70 hover:text-[#c42b2b]'
                      }`}
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      <span aria-hidden="true">←</span>
                      <span>Previous</span>
                    </button>

                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#e8e0d4]/30" style={{ fontFamily: '"Inter", sans-serif' }}>
                      Phase 0{selectedBeatIndex + 1} of 0{beats.length}
                    </span>

                    <button
                      onClick={() => setSelectedBeatIndex(Math.min(beats.length - 1, selectedBeatIndex + 1))}
                      disabled={selectedBeatIndex === beats.length - 1}
                      className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] transition-colors py-1 ${
                        selectedBeatIndex === beats.length - 1
                          ? 'opacity-20 cursor-not-allowed text-[#f5f0e8]'
                          : 'text-[#e8e0d4]/70 hover:text-[#c42b2b]'
                      }`}
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      <span>Next</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            <div className="mt-12 text-center">
              <p className="text-[11px] text-white/25 italic" style={{ fontFamily: '"Inter", sans-serif' }}>
                Placeholder story progression — editable in bookConfig.js
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;
