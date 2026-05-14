import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Conception {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

export default function Showroom() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [conceptions, setConceptions] = useState<Conception[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedItem, setSelectedItem] = useState<Conception | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/api/showroom')
      .then(res => {
        if (!res.ok) throw new Error('Erreur de chargement');
        return res.json();
      })
      .then((data: Conception[]) => {
        setConceptions(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Impossible de charger les réalisations.');
        setLoading(false);
      });
  }, []);

  const categories = ['Toutes', ...Array.from(new Set(conceptions.map(c => c.category)))];

  const filteredItems = selectedCategory === 'Toutes'
    ? conceptions
    : conceptions.filter(c => c.category === selectedCategory);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const header = headerRef.current;

    if (!section || !grid || !header || loading) return;

    const ctx = gsap.context(() => {

      gsap.fromTo(header,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const filters = header.querySelectorAll('.filter-btn');
      gsap.fromTo(filters,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = grid.querySelectorAll('.showroom-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: (i % 3) * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, [filteredItems, loading]);

  const openModal = (item: Conception, index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';

    gsap.fromTo('.modal-overlay',
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
    gsap.fromTo('.modal-content',
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    );
  };

  const closeModal = () => {
    gsap.to('.modal-content', {
      scale: 0.9,
      opacity: 0,
      y: 30,
      duration: 0.3,
      ease: 'power2.in',
    });
    gsap.to('.modal-overlay', {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      onComplete: () => {
        setSelectedItem(null);
        document.body.style.overflow = 'auto';
      }
    });
  };

  const navigateModal = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % filteredItems.length
      : (currentIndex - 1 + filteredItems.length) % filteredItems.length;

    setCurrentIndex(newIndex);

    gsap.to('.modal-image', {
      opacity: 0,
      x: direction === 'next' ? -30 : 30,
      duration: 0.2,
      onComplete: () => {
        setSelectedItem(filteredItems[newIndex]);
        gsap.fromTo('.modal-image',
          { opacity: 0, x: direction === 'next' ? 30 : -30 },
          { opacity: 1, x: 0, duration: 0.3 }
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <section ref={sectionRef} className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div ref={headerRef} className="text-center mb-12 md:mb-16">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-terracotta font-sans mb-4">
              Notre Univers
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-sage leading-[1.1] mb-6">
              Le <span className="italic">Showroom</span>
            </h1>
            <p className="text-base md:text-lg text-sage/50 font-sans font-light max-w-xl mx-auto mb-10">
              Découvrez nos créations uniques, entre artisanat tunisien et modernité douce.
            </p>

            {/* Filtres */}
            {!loading && !error && (
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`
                      filter-btn px-5 py-2 rounded-full text-sm font-sans transition-all duration-300
                      ${selectedCategory === cat
                        ? 'bg-sage text-white'
                        : 'bg-white/60 text-sage/70 hover:bg-white hover:text-sage border border-sage/10'
                      }
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-4/5 rounded-2xl md:rounded-3xl bg-sage/10 animate-pulse" />
              ))}
            </div>
          )}

          {/* Erreur */}
          {error && (
            <p className="text-center text-sage/50 font-sans">{error}</p>
          )}

          {/* Grid */}
          {!loading && !error && (
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="showroom-card group relative cursor-pointer"
                  onClick={() => openModal(item, index)}
                >
                  <div className="relative aspect-4/5 rounded-2xl md:rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-sage/0 group-hover:bg-sage/30 transition-colors duration-500" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
                      <ZoomIn className="w-6 h-6 text-sage" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs text-sage font-sans mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-serif text-white drop-shadow-lg">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modale */}
      {selectedItem && (
        <div className="modal-overlay fixed inset-0 z-50 bg-sage/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
          <div className="modal-content relative w-full max-w-5xl max-h-[90vh] bg-[#FDFCFA] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            >
              <X className="w-5 h-5 text-sage" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              <div className="relative h-64 md:h-80 lg:h-auto overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="modal-image absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">
                <span className="inline-block w-fit px-3 py-1 bg-linen rounded-full text-xs text-sage/60 font-sans mb-4">
                  {selectedItem.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-sage mb-4">
                  {selectedItem.title}
                </h2>
                <p className="text-base text-sage/60 font-sans font-light leading-relaxed mb-8">
                  {selectedItem.description}
                </p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigateModal('prev')}
                    className="w-12 h-12 rounded-full border border-sage/20 flex items-center justify-center hover:bg-sage hover:text-white hover:border-sage transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-sage/40 font-sans">
                    {currentIndex + 1} / {filteredItems.length}
                  </span>
                  <button
                    onClick={() => navigateModal('next')}
                    className="w-12 h-12 rounded-full border border-sage/20 flex items-center justify-center hover:bg-sage hover:text-white hover:border-sage transition-all duration-300"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
