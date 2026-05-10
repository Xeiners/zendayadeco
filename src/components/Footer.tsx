import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Camera, Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: 'Collections', href: '#collections' },
  { label: 'Showroom', href: '#showroom' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Camera, href: 'https://instagram.com/zendayadeco', label: 'Instagram' },
  { icon: Mail, href: 'mailto:hello@zendayadeco.com', label: 'Email' },
  { icon: MapPin, href: '#showroom', label: 'Showroom' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (targetId: string) => {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    const ctx = gsap.context(() => {
      // Fade up du contenu
      gsap.fromTo(content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Ligne décorative qui s'étire
      const line = footer.querySelector('.footer-line');
      if (line) {
        gsap.fromTo(line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: footer,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="w-full bg-sage text-white"
    >
      {/* Ligne décorative en haut */}
      <div className="footer-line h-px bg-white/10" />

      <div ref={contentRef} className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Logo + Description */}
          <div className="md:col-span-5">
            <a href="#" onClick={scrollToTop} className="inline-block mb-6">
              <span className="font-serif text-3xl md:text-4xl tracking-tight">
                Zendayadeco
              </span>
            </a>
            <p className="text-white/50 font-sans font-light text-sm md:text-base leading-relaxed max-w-sm mb-8">
              Création d'intérieurs naturels et harmonieux, entre artisanat tunisien et modernité douce.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <IconComponent className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 font-sans mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href.replace('#', ''))}
                    className="group inline-flex items-center gap-2 text-white/60 hover:text-white font-sans text-sm font-light transition-colors duration-300 cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact rapide */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 font-sans mb-6">
              Contact
            </h4>
            <div className="space-y-4">
              <p className="text-white/60 font-sans text-sm font-light">
                hello@zendayadeco.com
              </p>
              <p className="text-white/60 font-sans text-sm font-light">
                +216 20 123 456
              </p>
              <p className="text-white/60 font-sans text-sm font-light">
                12 Rue du Artisanat
                <br />
                Tunis, Tunisie
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 font-sans text-lg tracking-wider">
              © 2026 Zendayadeco. Tous droits réservés.
            </p>

            {/* Développé par KomoDev */}
            <a
              href="https://komodev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-white/30 hover:text-terracotta font-sans text-lg tracking-wider transition-colors duration-300"
            >
              <span>Développé par</span>
              <span className="font-medium text-white/50 group-hover:text-terracotta transition-colors">
                KomoDev
              </span>
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-terracotta hover:border-terracotta transition-all duration-300 group z-50"
        aria-label="Retour en haut"
      >
        <ArrowUpRight className="w-5 h-5 text-white/60 group-hover:text-white -rotate-45 transition-colors" />
      </button>
    </footer>
  );
}