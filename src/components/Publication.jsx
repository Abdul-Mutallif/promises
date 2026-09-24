import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import bookConfig from '../data/bookConfig';

export default function Publication() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const calculateTimeLeft = () => {
    const targetDate = new Date(bookConfig.publicationDate || "2027-12-01T00:00:00").getTime();
    const distance = targetDate - Date.now();
    if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1], staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="publication" className="py-28 bg-[#111111] text-[#f5f0e8] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-12">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="text-center mb-14">
            <span className="text-[#c42b2b] text-[11px] uppercase tracking-[0.2em] font-medium block mb-5" style={{ fontFamily: '"Inter", sans-serif' }}>
              PUBLICATION
            </span>
            <h2
              className="mb-6"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#f5f0e8',
                fontWeight: 400,
              }}
            >
              Publication Details
            </h2>
            <div className="inline-flex items-center gap-2 text-[10px] text-[#f5f0e8]/30 tracking-wider uppercase">
              <span className="w-1 h-1 rounded-full bg-[#c42b2b]/40" />
              Example / Placeholder
            </div>
          </motion.div>

          {/* Info Grid Card */}
          <motion.div variants={itemVariants} className="w-full bg-[#141414]/80 backdrop-blur-sm border border-[#f5f0e8]/[0.04] p-8 md:p-12 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {[
                { label: 'Expected Publication', value: bookConfig.publicationDisplay },
                { label: 'Publisher', value: bookConfig.publisher },
                { label: 'Format', value: bookConfig.format },
                { label: 'ISBN', value: bookConfig.isbn },
                { label: 'Language', value: bookConfig.language },
              ].map((item) => (
                <div key={item.label} className="border-b border-[#f5f0e8]/[0.05] pb-4">
                  <div className="text-[10px] text-[#f5f0e8]/25 uppercase tracking-[0.15em] mb-2" style={{ fontFamily: '"Inter", sans-serif' }}>
                    {item.label}
                  </div>
                  <div className="text-lg" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}>
                    {item.value}
                  </div>
                </div>
              ))}
              
              <div className="border-b border-[#f5f0e8]/[0.05] pb-4">
                <div className="text-[10px] text-[#f5f0e8]/25 uppercase tracking-[0.15em] mb-2" style={{ fontFamily: '"Inter", sans-serif' }}>
                  Status
                </div>
                <div className="inline-flex items-center gap-3">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c42b2b] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c42b2b]"></span>
                  </span>
                  <span className="text-lg text-[#c42b2b]" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}>
                    {bookConfig.status}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Countdown Section */}
          <motion.div variants={itemVariants} className="w-full text-center flex flex-col items-center">
            <h3
              className="mb-3"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                color: '#f5f0e8',
                fontWeight: 400,
              }}
            >
              When will the book be published?
            </h3>
            <p className="text-[#f5f0e8]/35 mb-10 text-sm" style={{ fontFamily: '"Inter", sans-serif' }}>
              The official publication date will be announced soon.
            </p>

            <div
              className="text-[#f5f0e8]/[0.06] tracking-[0.3em] mb-10 uppercase select-none"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 300,
              }}
            >
              COMING SOON
            </div>

            <div className="inline-flex items-center gap-2 text-[#f5f0e8]/50 text-sm tracking-wide mb-14">
              Expected: {bookConfig.publicationDisplay || 'December 2027'}
              <span className="text-[10px] text-[#c42b2b]/50 tracking-wider uppercase ml-2">Placeholder</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((unit) => (
                <div key={unit.label} className="flex flex-col items-center bg-[#141414] border border-[#f5f0e8]/[0.04] p-5 sm:p-7 min-w-[85px] sm:min-w-[100px]">
                  <motion.div 
                    initial={{ opacity: 0.5, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-2"
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                      color: '#f5f0e8',
                      fontWeight: 300,
                    }}
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.div>
                  <div className="text-[9px] text-[#f5f0e8]/25 uppercase tracking-[0.2em]" style={{ fontFamily: '"Inter", sans-serif' }}>
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-[#f5f0e8]/15 italic" style={{ fontFamily: '"Inter", sans-serif' }}>
              * Placeholder publication date — countdown will update automatically
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
