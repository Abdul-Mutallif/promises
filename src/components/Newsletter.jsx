import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import bookConfig from '../data/bookConfig';

const editionsList = [
  { id: 'paperback', label: 'Paperback' },
  { id: 'ebook', label: 'Kindle / eBook' },
  { id: 'signed', label: 'Signed Collector’s Edition' },
];

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [selectedEditions, setSelectedEditions] = useState(['paperback', 'signed']);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const toggleEdition = (id) => {
    setSelectedEditions((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((item) => item !== id)
          : prev // keep at least one
        : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  const getSelectedLabels = () => {
    return editionsList
      .filter((ed) => selectedEditions.includes(ed.id))
      .map((ed) => ed.label)
      .join(', ');
  };

  return (
    <section id="newsletter" className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[radial-gradient(circle,rgba(196,43,43,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-xl mx-auto text-center relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="block text-[#c42b2b] uppercase tracking-[0.25em] text-[11px] mb-4 font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
            EARLY ACCESS & PRE-ORDER
          </span>
          <h2
            className="mb-4"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              color: '#f5f0e8',
              fontWeight: 400,
            }}
          >
            Be the First to Hold the Book
          </h2>
          <p
            className="mb-8"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.1rem',
              color: 'rgba(232, 224, 212, 0.55)',
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Join the reader priority list for <em className="text-[#f5f0e8]/80">{bookConfig.fullTitle}</em>. Select your preferred editions below:
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Edition Preference Selector */}
              <div className="flex flex-wrap justify-center gap-2.5">
                {editionsList.map((edition) => {
                  const isChecked = selectedEditions.includes(edition.id);
                  return (
                    <button
                      type="button"
                      key={edition.id}
                      onClick={() => toggleEdition(edition.id)}
                      className={`px-3.5 py-2 text-xs uppercase tracking-wider rounded-sm transition-all duration-300 flex items-center gap-2 ${
                        isChecked
                          ? 'bg-[#c42b2b]/15 border border-[#c42b2b] text-[#f5f0e8] shadow-[0_0_15px_rgba(196,43,43,0.2)]'
                          : 'bg-[#141414] border border-white/10 text-[#e8e0d4]/40 hover:border-white/20'
                      }`}
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      <span className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[10px] ${
                        isChecked ? 'bg-[#c42b2b] text-white' : 'border border-white/20'
                      }`}>
                        {isChecked && '✓'}
                      </span>
                      <span>{edition.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Email Input & Submit */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-3.5 bg-[#141212] border border-white/10 text-[#f5f0e8] placeholder-[#e8e0d4]/25 focus:outline-none focus:border-[#c42b2b] transition-all text-sm rounded-sm"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#c42b2b] hover:bg-[#a82424] text-[#f5f0e8] uppercase tracking-[0.15em] text-xs font-medium transition-all duration-300 hover:shadow-[0_0_25px_rgba(196,43,43,0.35)] shrink-0 rounded-sm"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  Notify Me
                </button>
              </div>

              <p className="text-[10px] text-[#e8e0d4]/30 italic" style={{ fontFamily: '"Inter", sans-serif' }}>
                * No spam, ever. Only official publication updates and exclusive excerpt previews.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#141212] border border-[#c42b2b]/30 p-8 rounded-sm text-center shadow-2xl"
            >
              <div className="w-10 h-10 rounded-full bg-[#c42b2b]/20 border border-[#c42b2b] text-[#c42b2b] flex items-center justify-center mx-auto mb-4 text-lg">
                ✓
              </div>
              <h3
                className="text-2xl text-[#f5f0e8] mb-2"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                You’re on the Priority List
              </h3>
              <p className="text-[#e8e0d4]/65 text-sm leading-relaxed mb-4" style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}>
                We have registered <span className="text-[#f5f0e8] font-medium">{email}</span> for notifications regarding:
              </p>
              <div className="inline-block px-4 py-1.5 bg-[#c42b2b]/10 border border-[#c42b2b]/30 text-xs text-[#f5f0e8] tracking-wider mb-6">
                {getSelectedLabels()}
              </div>
              <div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                  }}
                  className="text-xs text-[#e8e0d4]/40 hover:text-[#f5f0e8] underline transition-colors"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  Register another email
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
