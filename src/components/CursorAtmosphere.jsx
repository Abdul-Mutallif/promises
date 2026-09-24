import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CursorAtmosphere() {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  // Smooth springs for cursor spotlight
  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    // Only enable on fine pointer devices and if reduced motion is not preferred
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const handlePointerMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {/* Primary crimson aura following cursor */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: cursorX,
          top: cursorY,
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, rgba(196, 43, 43, 0.075) 0%, rgba(139, 34, 82, 0.035) 45%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Tiny focal pinpoint glow */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: cursorX,
          top: cursorY,
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(232, 224, 212, 0.04) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
