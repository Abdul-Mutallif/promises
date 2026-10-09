import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LetGoBurner() {
  const [text, setText] = useState('');
  const [isBurning, setIsBurning] = useState(false);
  const [burnedText, setBurnedText] = useState('');

  const handleBurn = (e) => {
    e.preventDefault();
    if (!text.trim() || isBurning) return;
    
    setBurnedText(text);
    setText('');
    setIsBurning(true);
    
    // Reset after animation
    setTimeout(() => {
      setIsBurning(false);
      setBurnedText('');
    }, 2500);
  };

  return (
    <section className="py-24 md:py-36 bg-[#0a0a0a] relative overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(196,43,43,0.05)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="max-w-2xl mx-auto px-6 text-center z-10 w-full">
        <span className="text-[#c42b2b] text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium block mb-4" style={{ fontFamily: '"Inter", sans-serif' }}>
          THE ASHES
        </span>
        <h2 className="text-3xl md:text-5xl text-[#f5f0e8] mb-6" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontStyle: 'italic' }}>
          Let It Go
        </h2>
        <p className="text-sm md:text-base text-[#e8e0d4]/50 leading-relaxed font-light mb-12 max-w-md mx-auto" style={{ fontFamily: '"Inter", sans-serif' }}>
          Some words are not meant to be saved. Type a regret, a broken promise, or a name. When you release it, it will burn away forever.
        </p>

        <div className="relative max-w-md mx-auto h-[120px]">
          <AnimatePresence>
            {!isBurning ? (
              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleBurn}
                className="absolute inset-0 flex flex-col items-center gap-6"
              >
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="I promise to forget..."
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-center text-xl md:text-2xl text-[#f5f0e8] placeholder-[#f5f0e8]/20 focus:outline-none focus:border-[#c42b2b] transition-colors"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                />
                <button
                  type="submit"
                  disabled={!text.trim()}
                  className={`px-8 py-2.5 text-xs uppercase tracking-[0.2em] transition-all border ${
                    text.trim() 
                      ? 'border-[#c42b2b] text-[#c42b2b] hover:bg-[#c42b2b]/10 hover:shadow-[0_0_20px_rgba(196,43,43,0.3)]' 
                      : 'border-white/10 text-white/20 cursor-not-allowed'
                  }`}
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  Burn It
                </button>
              </motion.form>
            ) : (
              <motion.div
                className="absolute inset-0 flex items-start justify-center pointer-events-none"
              >
                <motion.p
                  initial={{ opacity: 1, filter: 'blur(0px) brightness(1) sepia(0) hue-rotate(0deg)', y: 0, scale: 1 }}
                  animate={{ 
                    opacity: 0, 
                    filter: 'blur(12px) brightness(2) sepia(1) hue-rotate(-30deg)', 
                    y: -60, 
                    scale: 1.1 
                  }}
                  transition={{ duration: 2, ease: "easeIn" }}
                  className="text-xl md:text-2xl text-[#f5f0e8] border-b border-transparent pb-2"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  {burnedText}
                </motion.p>
                
                {/* Fire Particles */}
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, y: 0, x: 0, scale: Math.random() * 0.5 + 0.5 }}
                    animate={{ 
                      opacity: 0, 
                      y: -Math.random() * 100 - 50, 
                      x: (Math.random() - 0.5) * 100 
                    }}
                    transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
                    className="absolute top-4 w-1.5 h-1.5 rounded-full bg-[#ff5500] blur-[1px]"
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
