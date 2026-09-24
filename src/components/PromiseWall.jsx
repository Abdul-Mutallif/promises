import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const defaultWhispers = [
  {
    id: 'w-1',
    text: 'You promised forever, but forever ended on a quiet Tuesday afternoon.',
    author: 'Anonymous',
    witnesses: 142,
    timestamp: 'Two days ago',
  },
  {
    id: 'w-2',
    text: 'I kept every single promise. You just weren’t there to see them kept.',
    author: 'A Fool',
    witnesses: 289,
    timestamp: 'Last night',
  },
  {
    id: 'w-3',
    text: 'I still check my phone when it vibrates in the rain, three years later.',
    author: 'Stranger on the train',
    witnesses: 97,
    timestamp: 'This morning',
  },
  {
    id: 'w-4',
    text: 'I forgave you long before you realized what you had broken.',
    author: 'From the quiet room',
    witnesses: 215,
    timestamp: 'Three days ago',
  },
  {
    id: 'w-5',
    text: 'We became strangers who know each other’s darkest secrets.',
    author: 'M.',
    witnesses: 341,
    timestamp: 'Yesterday',
  },
  {
    id: 'w-6',
    text: 'I loved who you were when you made that promise, not who you became to break it.',
    author: 'Someone who waited',
    witnesses: 178,
    timestamp: 'Four days ago',
  },
];

export default function PromiseWall() {
  const [whispers, setWhispers] = useState(() => {
    try {
      const stored = localStorage.getItem('promises_wall_whispers');
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem('promises_wall_whispers', JSON.stringify(defaultWhispers));
      return defaultWhispers;
    } catch {
      return defaultWhispers;
    }
  });

  const [witnessedIds, setWitnessedIds] = useState(() => {
    try {
      const witnessed = localStorage.getItem('promises_witnessed_ids');
      return witnessed ? JSON.parse(witnessed) : [];
    } catch {
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newText, setNewText] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  // Escape key closes modal & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const handleWitness = (id) => {
    if (witnessedIds.includes(id)) return;

    const updatedWhispers = whispers.map((w) =>
      w.id === id ? { ...w, witnesses: w.witnesses + 1 } : w
    );
    const updatedWitnessed = [...witnessedIds, id];

    setWhispers(updatedWhispers);
    setWitnessedIds(updatedWitnessed);

    try {
      localStorage.setItem('promises_wall_whispers', JSON.stringify(updatedWhispers));
      localStorage.setItem('promises_witnessed_ids', JSON.stringify(updatedWitnessed));
    } catch {
      // storage error fallback
    }
  };

  const handleAddWhisper = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newWhisper = {
      id: `w-custom-${Date.now()}`,
      text: newText.trim(),
      author: newAuthor.trim() || 'Anonymous',
      witnesses: 1,
      timestamp: 'Just now',
    };

    const updated = [newWhisper, ...whispers];
    setWhispers(updated);
    setWitnessedIds((prev) => [...prev, newWhisper.id]);

    try {
      localStorage.setItem('promises_wall_whispers', JSON.stringify(updated));
    } catch {
      // storage fallback
    }

    setNewText('');
    setNewAuthor('');
    setIsModalOpen(false);
  };

  return (
    <section className="py-28 md:py-36 bg-[#0a0a0a] text-[#f5f0e8] relative overflow-hidden" ref={ref}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[radial-gradient(circle,rgba(196,43,43,0.045)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span
            className="text-[#c42b2b] text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium block mb-4"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            THE SANCTUARY OF UNHEARD WORDS
          </span>
          <h2
            className="text-3xl md:text-5xl text-[#f5f0e8] mb-4"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontStyle: 'italic' }}
          >
            Words Left Unsaid
          </h2>
          <p
            className="max-w-xl mx-auto text-sm md:text-base text-[#e8e0d4]/55 leading-relaxed mb-8"
            style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
          >
            An anonymous wall for the promises that were made, the ones that were broken, and the words you never had the courage to say aloud.
          </p>

          {/* Call to action button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#c42b2b]/15 hover:bg-[#c42b2b]/25 border border-[#c42b2b]/50 text-[#f5f0e8] text-xs uppercase tracking-[0.18em] transition-all rounded-sm shadow-[0_0_20px_rgba(196,43,43,0.2)] hover:shadow-[0_0_30px_rgba(196,43,43,0.35)]"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            <span>+ Leave a Whisper</span>
          </button>
        </motion.div>

        {/* Masonry / Grid of Whispers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whispers.map((item, index) => {
            const isWitnessed = witnessedIds.includes(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: (index % 6) * 0.1 }}
                className="bg-gradient-to-b from-[#161414] to-[#100f0f] border border-white/[0.07] hover:border-[#c42b2b]/40 p-7 rounded-sm flex flex-col justify-between transition-all duration-400 group relative shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
              >
                {/* Quote text */}
                <div className="mb-6">
                  <span
                    className="text-2xl text-[#c42b2b]/40 leading-none select-none block mb-1 font-serif"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    “
                  </span>
                  <p
                    className="text-lg md:text-xl text-[#f5f0e8]/90 italic leading-relaxed font-light"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    {item.text}
                  </p>
                </div>

                {/* Footer metadata & Witness button */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                  <div>
                    <span
                      className="text-[10px] uppercase tracking-[0.18em] text-[#e8e0d4]/50 block"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      — {item.author}
                    </span>
                    <span
                      className="text-[9px] text-white/20 block"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      {item.timestamp}
                    </span>
                  </div>

                  <button
                    onClick={() => handleWitness(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all ${
                      isWitnessed
                        ? 'text-[#c42b2b] bg-[#c42b2b]/15 border border-[#c42b2b]/40'
                        : 'text-white/40 hover:text-white/80 bg-white/[0.03] border border-white/[0.06] hover:border-white/15'
                    }`}
                    title={isWitnessed ? 'You have witnessed this whisper' : 'Witness this whisper'}
                  >
                    <span className="text-xs" aria-hidden="true">🕯️</span>
                    <span className="text-[10px] tracking-wider" style={{ fontFamily: '"Inter", sans-serif' }}>
                      {item.witnesses}
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Leave a Whisper Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-md"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Whisper to the Dark"
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 25 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-lg bg-[#141212] border border-[#f5f0e8]/15 rounded-sm p-7 sm:p-9 shadow-2xl overflow-hidden"
            >
              {/* Top red accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c42b2b] to-transparent" />

              <div className="flex justify-between items-center mb-6">
                <span
                  className="text-[10px] uppercase tracking-[0.2em] text-[#c42b2b] font-medium"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  Whisper to the Dark
                </span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                  className="text-white/40 hover:text-white p-1 rounded-full"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddWhisper} className="space-y-4">
                <div>
                  <textarea
                    required
                    maxLength={160}
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Write the promise you couldn't keep, or the one you are still waiting for..."
                    aria-label="Write your promise"
                    rows={4}
                    className="w-full p-4 bg-[#0d0c0c] border border-white/10 text-[#f5f0e8] placeholder-[#e8e0d4]/25 focus:outline-none focus:border-[#c42b2b] transition-all text-sm rounded-sm resize-none"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem' }}
                  />
                  <div className="flex justify-end text-[10px] text-white/30 mt-1">
                    {newText.length} / 160 characters
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    maxLength={30}
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="How would you like to be known? (e.g. 'A Fool', 'Anonymous', 'S.')"
                    aria-label="Your pseudonym or name"
                    className="w-full px-4 py-3 bg-[#0d0c0c] border border-white/10 text-[#f5f0e8] placeholder-[#e8e0d4]/25 focus:outline-none focus:border-[#c42b2b] transition-all text-xs rounded-sm"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-xs uppercase tracking-wider text-white/50 hover:text-white"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#c42b2b] hover:bg-[#a82424] text-[#f5f0e8] text-xs uppercase tracking-[0.15em] font-medium transition-all shadow-[0_0_20px_rgba(196,43,43,0.3)] rounded-sm"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    Release Whisper
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
