import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import bookConfig from '../data/bookConfig';

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <footer id="contact" className="pt-20 pb-10 px-6 bg-[#0a0a0a] border-t border-[rgba(245,240,232,0.06)]">
      <div className="max-w-6xl mx-auto flex flex-col items-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full"
        >
          {/* Top Section */}
          <div className="mb-10">
            <h3 className="text-2xl md:text-3xl text-[#f5f0e8] mb-2" style={{ fontFamily: '"Great Vibes", cursive', color: '#c42b2b' }}>
              {bookConfig?.title || 'Promises'}
            </h3>
            <p className="text-sm tracking-[0.1em] uppercase text-[#e8e0d4]/40" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300 }}>
              {bookConfig?.subtitle}
            </p>
          </div>
          
          <div className="w-full max-w-md mx-auto h-px bg-[rgba(245,240,232,0.06)] mb-10"></div>

          {/* Middle: Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {bookConfig?.footerLinks && bookConfig.footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative font-body text-[#e8e0d4]/80 text-sm uppercase tracking-widest hover:text-[#f5f0e8] transition-colors"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c42b2b] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            {(!bookConfig?.footerLinks || bookConfig.footerLinks.length === 0) && (
              <>
                <a
                  href="#about"
                  className="group relative font-body text-[#e8e0d4]/80 text-sm uppercase tracking-widest hover:text-[#f5f0e8] transition-colors"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c42b2b] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#excerpt"
                  className="group relative font-body text-[#e8e0d4]/80 text-sm uppercase tracking-widest hover:text-[#f5f0e8] transition-colors"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  Excerpt
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c42b2b] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#contact"
                  className="group relative font-body text-[#e8e0d4]/80 text-sm uppercase tracking-widest hover:text-[#f5f0e8] transition-colors"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c42b2b] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </>
            )}
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mb-16">
            {bookConfig?.social && Object.entries(bookConfig.social).map(([platform, url]) => {
              if (!url) return null;
              const isMailto = typeof url === 'string' && url.startsWith('mailto:');
              return (
                <a
                  key={platform}
                  href={url}
                  target={isMailto ? undefined : "_blank"}
                  rel={isMailto ? undefined : "noopener noreferrer"}
                  className="font-body text-[#e8e0d4]/60 text-sm capitalize hover:text-[#c42b2b] transition-colors"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  {platform}
                </a>
              );
            })}
            {(!bookConfig?.social || Object.keys(bookConfig.social).length === 0) && (
              <>
                <a
                  href="#"
                  className="font-body text-[#e8e0d4]/60 text-sm hover:text-[#c42b2b] transition-colors"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="font-body text-[#e8e0d4]/60 text-sm hover:text-[#c42b2b] transition-colors"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="font-body text-[#e8e0d4]/60 text-sm hover:text-[#c42b2b] transition-colors"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  Email
                </a>
              </>
            )}
          </div>

          {/* Bottom */}
          <div>
            <p className="font-body text-[#e8e0d4]/30 text-xs" style={{ fontFamily: '"Inter", sans-serif' }}>
              © {new Date().getFullYear()} {bookConfig?.author || 'Abdul Mutallif'}. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
