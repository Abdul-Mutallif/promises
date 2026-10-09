import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PreLoader() {
  const [stage, setStage] = useState(0); // 0: typing, 1: dissolving, 2: hidden
  const [displayedText, setDisplayedText] = useState('');
  
  const quote = "I did not love her blindly because I could not see. I loved her blindly because I chose to believe in what she promised rather than what the world proved.";

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText(quote.substring(0, i + 1));
      i++;
      if (i >= quote.length) {
        clearInterval(typingInterval);
        
        // Wait 1.5 seconds, then dissolve
        setTimeout(() => {
          setStage(1);
          
          // Wait 1 second for dissolve to finish, then hide entire loader
          setTimeout(() => {
            setStage(2);
            document.body.style.overflow = '';
          }, 1500);
          
        }, 1500);
      }
    }, 40);

    return () => {
      clearInterval(typingInterval);
      document.body.style.overflow = '';
    };
  }, []);

  if (stage === 2) return null;

  return (
    <AnimatePresence>
      {stage < 2 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center p-6 md:p-12 pointer-events-auto"
        >
          <motion.div
            animate={
              stage === 1 
                ? { opacity: 0, y: -40, filter: 'blur(12px)', scale: 1.05 } 
                : { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }
            }
            transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-4xl text-center relative"
          >
            <p
              className="text-xl md:text-3xl lg:text-4xl text-[#e8e0d4] leading-loose"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300 }}
            >
              “{displayedText}
              {stage === 0 && (
                <span className="inline-block w-[2px] h-[1em] bg-[#c42b2b] ml-1 align-middle animate-pulse" />
              )}
              ”
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
