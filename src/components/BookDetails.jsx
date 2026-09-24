import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import bookConfig from '../data/bookConfig';

export default function BookDetails() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const details = [
    { label: 'Title', value: bookConfig.fullTitle },
    { label: 'Author', value: bookConfig.author },
    { label: 'Genre', value: bookConfig.genre },
    { label: 'Language', value: bookConfig.language },
    { label: 'Format', value: bookConfig.format },
    { label: 'Publication', value: `${bookConfig.status} (${bookConfig.publicationDisplay})` },
    { label: 'Publisher', value: bookConfig.publisher || 'To Be Announced' },
    { label: 'ISBN', value: bookConfig.isbn || 'To Be Announced' },
    { label: 'Pages', value: bookConfig.pages },
  ];

  return (
    <section id="details" className="py-24 bg-[#0a0a0a] text-[#f5f0e8] relative overflow-hidden flex justify-center">
      <div className="max-w-4xl w-full px-6 sm:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#141212]/90 backdrop-blur-md border border-[#f5f0e8]/[0.06] p-8 md:p-14 rounded-sm shadow-2xl"
        >
          <div className="text-center mb-12">
            <span className="text-[#c42b2b] text-[10px] tracking-[0.25em] uppercase font-medium block mb-2" style={{ fontFamily: '"Inter", sans-serif' }}>
              SPECIFICATIONS
            </span>
            <h2
              className="text-3xl md:text-4xl text-[#f5f0e8]"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}
            >
              Book Details
            </h2>
            <div className="h-[1px] w-16 bg-[#c42b2b]/40 mx-auto mt-4"></div>
          </div>

          <div className="space-y-4">
            {details.map((detail) => (
              <div key={detail.label} className="flex flex-col sm:flex-row sm:justify-between sm:items-end py-2">
                <span className="text-[#f5f0e8]/40 text-xs tracking-wider uppercase shrink-0 sm:mr-4 mb-1 sm:mb-0" style={{ fontFamily: '"Inter", sans-serif' }}>
                  {detail.label}
                </span>
                
                <div className="hidden sm:block flex-grow border-b border-dotted border-[#f5f0e8]/15 mx-4 relative top-[-6px]"></div>
                
                <span className="text-[#f5f0e8] text-base sm:text-lg text-left sm:text-right" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}>
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
