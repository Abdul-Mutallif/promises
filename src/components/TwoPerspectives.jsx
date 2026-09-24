import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import bookConfig from '../data/bookConfig';

const perspectives = {
  boy: {
    id: 'boy',
    title: 'The Foolish Boy',
    subtitle: 'The Devoted Prisoner of Hope',
    archetype: 'The Believer',
    color: '#c42b2b',
    quote: 'I did not love her blindly because I could not see. I loved her blindly because I chose to believe in what she promised rather than what the world proved.',
    confession:
      'He held words like sacred scripture. When she whispered in the dark, he took each syllable and built a future upon it. He refused to look at the cracks appearing in the foundation, convinced that sufficient faith could keep gravity at bay. To him, love wasn’t an exchange—it was a surrender.',
    keyLine: '‘I swore I would wait, even if the waiting devoured me whole.’',
    symbol: '∞',
  },
  girl: {
    id: 'girl',
    title: 'Her Silence',
    subtitle: 'The Reluctant Architect of Ruin',
    archetype: 'The Guarded',
    color: '#e8e0d4',
    quote: 'I made those promises not to deceive him, but because in those fleeting moments, I wanted desperately to be the person who could keep them.',
    confession:
      'She watched him build a cathedral out of her quietest reassurances. Every day, terror tightened in her throat as she saw his absolute certainty. How do you tell someone whose entire faith rests on your shoulders that your hands have been trembling from the very beginning? So she chose silence—the cruelest mercy of all.',
    keyLine: '‘Some words are spoken not to bind tomorrow, but to survive tonight.’',
    symbol: '◇',
  },
};

export default function TwoPerspectives() {
  const [activeTab, setActiveTab] = useState('boy');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const current = perspectives[activeTab] || perspectives.boy;

  return (
    <section className="py-28 md:py-36 bg-[#0d0c0c] text-[#f5f0e8] relative overflow-hidden" ref={ref}>
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(196,43,43,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#c42b2b] text-[11px] uppercase tracking-[0.3em] font-medium block mb-4" style={{ fontFamily: '"Inter", sans-serif' }}>
            DUALITY OF A TRAGEDY
          </span>
          <h2
            className="text-3xl md:text-5xl text-[#f5f0e8] mb-6"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontStyle: 'italic' }}
          >
            Two Souls. One Promise. Different Truths.
          </h2>
          <p
            className="max-w-xl mx-auto text-sm md:text-base text-[#e8e0d4]/55 leading-relaxed"
            style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
          >
            Every heartbreak carries two distinct memories of the same conversation. Explore how both sides lived inside the promises made in the dark.
          </p>

          {/* Perspective Selector Pills */}
          <div 
            role="tablist" 
            aria-label="Perspective selector"
            className="inline-flex p-1 bg-[#141212] border border-white/10 rounded-full mt-10 shadow-lg"
          >
            <button
              role="tab"
              id="tab-boy"
              aria-selected={activeTab === 'boy'}
              aria-controls="perspective-panel"
              onClick={() => setActiveTab('boy')}
              className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] transition-all duration-400 font-medium ${
                activeTab === 'boy'
                  ? 'bg-[#c42b2b] text-[#f5f0e8] shadow-[0_0_20px_rgba(196,43,43,0.4)]'
                  : 'text-[#e8e0d4]/50 hover:text-[#f5f0e8]'
              }`}
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              The Foolish Boy
            </button>
            <button
              role="tab"
              id="tab-girl"
              aria-selected={activeTab === 'girl'}
              aria-controls="perspective-panel"
              onClick={() => setActiveTab('girl')}
              className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] transition-all duration-400 font-medium ${
                activeTab === 'girl'
                  ? 'bg-[#e8e0d4] text-[#0a0a0a] shadow-[0_0_20px_rgba(232,224,212,0.3)]'
                  : 'text-[#e8e0d4]/50 hover:text-[#f5f0e8]'
              }`}
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Her Silence
            </button>
          </div>
        </motion.div>

        {/* Perspective Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            role="tabpanel"
            id="perspective-panel"
            aria-labelledby={activeTab === 'boy' ? 'tab-boy' : 'tab-girl'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#141212]/95 border border-[#f5f0e8]/[0.08] p-8 md:p-14 rounded-sm shadow-2xl relative overflow-hidden"
          >
            {/* Top decorative stripe */}
            <div
              className="absolute top-0 left-0 h-[2px] w-full"
              style={{
                background:
                  activeTab === 'boy'
                    ? 'linear-gradient(90deg, #c42b2b, transparent)'
                    : 'linear-gradient(90deg, #e8e0d4, transparent)',
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              {/* Left Column: Summary & Archetype */}
              <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-white/[0.08] pb-8 md:pb-0 md:pr-8">
                <span
                  className="text-4xl block mb-4"
                  style={{ color: current.color }}
                >
                  {current.symbol}
                </span>

                <span className="text-[10px] uppercase tracking-[0.2em] text-[#e8e0d4]/40 block mb-2" style={{ fontFamily: '"Inter", sans-serif' }}>
                  Perspective
                </span>
                <h3
                  className="text-2xl md:text-3xl text-[#f5f0e8] mb-2"
                  style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}
                >
                  {current.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#c42b2b] mb-6" style={{ fontFamily: '"Inter", sans-serif' }}>
                  {current.archetype}
                </p>

                <div className="bg-white/[0.03] border border-white/[0.06] p-4 rounded-sm">
                  <span className="text-[9px] uppercase tracking-widest text-[#e8e0d4]/40 block mb-1.5" style={{ fontFamily: '"Inter", sans-serif' }}>
                    Unspoken Core Truth
                  </span>
                  <p
                    className="text-xs text-[#e8e0d4]/80 italic"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', lineHeight: '1.5' }}
                  >
                    {current.keyLine}
                  </p>
                </div>
              </div>

              {/* Right Column: Narrative Quote & Confession */}
              <div className="md:col-span-8 flex flex-col justify-center">
                <span className="text-4xl text-[#c42b2b]/30 font-serif leading-none select-none mb-3">“</span>
                <blockquote
                  className="text-xl sm:text-2xl text-[#f5f0e8] italic leading-relaxed mb-6"
                  style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300 }}
                >
                  {current.quote}
                </blockquote>

                <div className="w-12 h-[1px] bg-white/10 mb-6" />

                <p
                  className="text-sm md:text-base text-[#e8e0d4]/70 leading-relaxed font-light"
                  style={{ fontFamily: '"Inter", sans-serif', lineHeight: '1.8' }}
                >
                  {current.confession}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
