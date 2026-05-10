import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Home, PartyPopper, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Home,
    title: 'Aménagement d\'intérieur',
    description: 'Création d\'espaces harmonieux privilégiant le confort et les matériaux nobles.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
  },
  {
    icon: PartyPopper,
    title: 'Scénographie Événementielle',
    description: 'Mise en scène de vos moments d\'exception avec une touche artisanale unique.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
  },
  {
    icon: MessageCircle,
    title: 'Conseil Personnalisé',
    description: 'Un accompagnement sur-mesure pour révéler l\'âme de votre intérieur.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !header || cards.length === 0) return;

    const ctx = gsap.context(() => {

      gsap.fromTo(header,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      
      cards.forEach((card, i) => {
        // Image parallax interne
        const img = card.querySelector('img');
        if (img) {
          gsap.to(img, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        // Card reveal avec rotation subtile
        gsap.fromTo(card,
          {
            y: 80,
            opacity: 0,
            rotateY: i % 2 === 0 ? -5 : 5,  // Rotation alternée gauche/droite
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 1,
            delay: i * 0.2,  // Stagger manuel
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Icon badge pop avec rebond
        const badge = card.querySelector('.icon-badge');
        if (badge) {
          gsap.fromTo(badge,
            { scale: 0, rotation: -180 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              delay: i * 0.2 + 0.4,
              ease: 'back.out(2.5)',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Texte content slide up
        const content = card.querySelector('.card-content');
        if (content) {
          gsap.fromTo(content,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.2 + 0.3,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // ==========================================
      // LIGNE DÉCORATIVE — Dessin progressif
      // ==========================================
      const line = header.querySelector('.deco-line');
      if (line) {
        gsap.fromTo(line,
          { scaleX: 0, transformOrigin: 'center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="w-full py-20 md:py-32 px-6 md:px-10 bg-linen overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-12 md:mb-20"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-4">
            Ce que nous proposons
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-sage leading-tight">
            Nos Prestations
          </h2>
          <div className="deco-line w-16 h-0.5 bg-terracotta mx-auto mt-6" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
                style={{ perspective: '1000px' }}
              >
                {/* Image */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover scale-110"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-sage/0 group-hover:bg-sage/10 transition-colors duration-500" />

                  {/* Icon badge */}
                  <div className="icon-badge absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                    <IconComponent className="w-5 h-5 text-sage" />
                  </div>
                </div>

                {/* Content */}
                <div className="card-content p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-serif text-sage mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-sage/70 font-sans font-light leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sage font-sans text-sm font-medium group/link"
                  >
                    <span>En savoir plus</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}