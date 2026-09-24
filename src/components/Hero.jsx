import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import bookConfig from '../data/bookConfig';

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();

    const particles = [];
    const particleCount = 65;

    for (let i = 0; i < particleCount; i++) {
      const isPaperFlake = Math.random() < 0.25;
      const isCrimsonEmber = !isPaperFlake && Math.random() < 0.35;

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: isPaperFlake ? Math.random() * 3 + 2 : Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: isPaperFlake ? Math.random() * 0.3 + 0.15 : -(Math.random() * 0.25 + 0.08),
        opacity: isPaperFlake ? Math.random() * 0.18 + 0.08 : Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.02,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        type: isPaperFlake ? 'flake' : (isCrimsonEmber ? 'ember' : 'dust'),
      });
    }

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Natural swaying motion
        const sway = Math.sin(frame * p.swaySpeed + p.swayOffset) * 0.4;
        p.x += p.vx + sway;
        p.y += p.vy;
        p.angle += p.vAngle;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (p.type === 'flake') {
          // Floating paper fragment
          ctx.fillStyle = `rgba(232, 224, 212, ${p.opacity * 0.7})`;
          ctx.fillRect(-p.size / 2, -p.size * 0.8, p.size, p.size * 1.6);
        } else if (p.type === 'ember') {
          // Warm crimson ember with glow
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
          gradient.addColorStop(0, `rgba(230, 57, 70, ${p.opacity})`);
          gradient.addColorStop(0.5, `rgba(196, 43, 43, ${p.opacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(196, 43, 43, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Classic atmospheric dust
          ctx.fillStyle = `rgba(245, 240, 232, ${p.opacity * 0.5})`;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] pt-24 pb-16">
      {/* Subtle radial glow behind title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(196,43,43,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Particles Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl"
        >
          {/* 1. Story Quote / Tagline at UPPER position */}
          <motion.p
            variants={itemVariants}
            className="max-w-xl px-4 leading-relaxed mb-4 md:mb-6"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
              color: 'rgba(232, 224, 212, 0.65)',
              fontStyle: 'italic',
              fontWeight: 300,
            }}
          >
            {bookConfig?.tagline || "A story about love, promises, and everything we fail to see when we love blindly."}
          </motion.p>

          {/* 2. Main Title in MIDDLE — Red Calligraphy */}
          <motion.h1
            variants={titleVariants}
            className="leading-[0.95] select-none"
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontSize: 'clamp(5.5rem, 14vw, 11rem)',
              color: '#c42b2b',
              textShadow: '0 0 70px rgba(196, 43, 43, 0.3), 0 4px 20px rgba(0,0,0,0.6)',
              paddingBottom: '0.05em',
            }}
          >
            {bookConfig?.title || "Promises"}
          </motion.h1>

          {/* 3. Subtitle right below Main Title — tight spacing */}
          <motion.h2
            variants={itemVariants}
            className="tracking-[0.22em] uppercase mt-0 md:-mt-2 mb-8 md:mb-10"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(1rem, 2.2vw, 1.45rem)',
              color: '#e8e0d4',
              fontWeight: 300,
              letterSpacing: '0.22em',
            }}
          >
            {bookConfig?.subtitle || "The Tale of a Foolish Boy"}
          </motion.h2>

          {/* Subtle Accent Divider */}
          <motion.div
            variants={itemVariants}
            className="w-16 h-[1px] mb-8 opacity-60"
            style={{ background: 'linear-gradient(90deg, transparent, #c42b2b, transparent)' }}
          />

          {/* Author */}
          <motion.p
            variants={itemVariants}
            className="text-xs tracking-[0.25em] uppercase mb-12 text-[#f5f0e8]/60 font-medium"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Written by {bookConfig?.author || "Abdul Mutallif"}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-5"
          >
            <a
              href="#book"
              className="group relative px-9 py-3.5 bg-[#c42b2b] text-[#f5f0e8] uppercase tracking-[0.15em] text-xs font-medium overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(196,43,43,0.4)]"
            >
              <span className="relative z-10">Explore the Book</span>
              <span className="absolute inset-0 bg-[#a02020] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
            <a
              href="#author"
              className="px-9 py-3.5 border border-[#f5f0e8]/15 text-[#f5f0e8]/70 uppercase tracking-[0.15em] text-xs font-medium hover:border-[#f5f0e8]/40 hover:text-[#f5f0e8] transition-all duration-400"
            >
              About the Author
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#book"
          aria-label="Scroll down to explore the book"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center opacity-40 hover:opacity-80 transition-opacity"
        >
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5f0e8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
