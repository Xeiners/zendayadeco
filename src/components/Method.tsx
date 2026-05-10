import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Échange',
    description: 'Nous découvrons votre espace, vos envies, vos habitudes et l\'atmosphère que vous souhaitez créer.',
  },
  {
    number: '02',
    title: 'Inspiration',
    description: 'Nous imaginons une direction artistique, une palette de matières, de couleurs et d\'ambiances.',
  },
  {
    number: '03',
    title: 'Sélection',
    description: 'Nous choisissons les pièces, objets, textures et éléments handmade qui donneront du caractère à votre intérieur.',
  },
  {
    number: '04',
    title: 'Réalisation',
    description: 'Nous vous accompagnons jusqu\'à la mise en place finale pour donner vie à un espace chaleureux et cohérent.',
  },
];

export default function MethodSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const line = lineRef.current;

    if (!section || !header || cards.length === 0) return;

    const ctx = gsap.context(() => {

      // ==========================================
      // HEADER — Fade + y: 24
      // ==========================================
      const label = header.querySelector('.method-label');
      const title = header.querySelector('.method-title');
      const subtitle = header.querySelector('.method-subtitle');
      const decoLine = header.querySelector('.deco-line');

      gsap.fromTo(label,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(title,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(decoLine,
        { scaleX: 0, transformOrigin: 'center' },
        {
          scaleX: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(subtitle,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // ==========================================
      // LIGNE HORIZONTALE — Dessin progressif
      // ==========================================
      if (line) {
        gsap.fromTo(line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.2,
            delay: 0.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // ==========================================
      // CARDS — Stagger premium
      // ==========================================
      cards.forEach((card, i) => {
        const number = card.querySelector('.step-number');
        const dot = card.querySelector('.step-dot');

        // Card principale : y: 45, scale: 0.97
        gsap.fromTo(card,
          { y: 45, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Numéro : x: -12, apparaît après la card
        gsap.fromTo(number,
          { x: -12, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.12 + 0.25,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Point sur la ligne
        if (dot) {
          gsap.fromTo(dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              delay: i * 0.12 + 0.4,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="method"
      className="w-full py-28 md:py-40 px-6 md:px-10 bg-[#F7F5F2]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 md:mb-28 max-w-3xl mx-auto">
          <span className="method-label inline-block text-xs uppercase tracking-[0.3em] text-terracotta font-sans mb-6">
            Notre Approche
          </span>

          <h2 className="method-title text-4xl md:text-5xl lg:text-6xl font-serif text-sage leading-[1.1] mb-8">
            Une méthode douce,
            <br />
            claire et <span className="italic">personnalisée</span>
          </h2>

          <div className="deco-line w-24 h-px bg-terracotta/30 mx-auto mb-8" />

          <p className="method-subtitle text-base md:text-lg text-sage/50 font-sans font-light leading-relaxed">
            De la première inspiration à la mise en place finale, chaque projet est accompagné avec attention pour créer un intérieur naturel, harmonieux et fidèle à votre histoire.
          </p>
        </div>

        {/* Timeline + Cards */}
        <div className="relative">
          {/* Ligne horizontale desktop */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-[120px] left-[12.5%] right-[12.5%] h-px bg-sage/10"
          />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative"
              >
                {/* Point sur la ligne (desktop only) */}
                <div className="step-dot hidden lg:flex absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-terracotta/20 border border-terracotta/40 items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-terracotta/60" />
                </div>

                {/* Card */}
                <div className="relative bg-[#FDFCFA] rounded-2xl md:rounded-[2rem] p-7 md:p-9 border border-[#E8E4DF] hover:border-[#D4C8B8] shadow-[0_2px_20px_rgba(44,62,53,0.04)] hover:shadow-[0_8px_40px_rgba(44,62,53,0.08)] transition-all duration-500 hover:-translate-y-1.5">
                  {/* Numéro */}
                  <div className="step-number mb-8">
                    <span className="block text-6xl md:text-7xl font-serif text-sage/[0.08] group-hover:text-terracotta/15 transition-colors duration-700 leading-none">
                      {step.number}
                    </span>
                  </div>

                  {/* Contenu */}
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-serif text-sage mb-4 group-hover:text-terracotta transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-[15px] text-sage/55 font-sans font-light leading-[1.7]">
                      {step.description}
                    </p>
                  </div>

                  {/* Trait décoratif en bas */}
                  <div className="mt-8 pt-6 border-t border-[#E8E4DF] group-hover:border-[#D4C8B8] transition-colors duration-500">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-px bg-terracotta/20 group-hover:bg-terracotta/40 transition-colors duration-500" />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-sage/30 font-sans">
                        Étape {step.number}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}