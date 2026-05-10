import { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, MapPin, Phone, Mail, Clock, ArrowUpRight, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: MapPin, label: 'Adresse', value: '12 Rue du Artisanat, Tunis' },
  { icon: Phone, label: 'Téléphone', value: '+216 20 123 456' },
  { icon: Mail, label: 'Email', value: 'hello@zendayadeco.com' },
  { icon: Clock, label: 'Horaires', value: 'Lun-Sam: 9h-18h' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (!section || !form || !info) return;

    const ctx = gsap.context(() => {

      // ==========================================
      // FORMULAIRE — Slide depuis la droite
      // ==========================================
      gsap.fromTo(form,
        { x: 80, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Champs du formulaire — Stagger
      const inputs = form.querySelectorAll('.form-field');
      gsap.fromTo(inputs,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // ==========================================
      // INFO — Slide depuis la gauche
      // ==========================================
      gsap.fromTo(info,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Items info — Stagger avec rotation
      const infoItems = info.querySelectorAll('.info-item');
      gsap.fromTo(infoItems,
        { x: -30, opacity: 0, rotation: -5 },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: info,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
        console.error('Erreur API:', data);
        alert(data.error || 'Erreur lors de l’envoi');
        return;
        }

        if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        }
    } catch (error) {
        console.error('Erreur réseau:', error);
        alert('Erreur réseau');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full py-20 md:py-32 px-6 md:px-10 bg-linen relative overflow-hidden scroll-mt-28 md:scroll-mt-32"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-sage/5 rounded-l-[3rem] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-4">
            Prenons contact
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-sage leading-tight mb-4">
            Commençons votre projet
          </h2>
          <p className="text-lg text-sage/60 font-sans font-light max-w-xl mx-auto">
            Racontez-nous votre vision. Nous vous accompagnons de la première idée à la réalisation finale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Info à gauche */}
          <div ref={infoRef} className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-serif text-sage mb-6">
                Nos coordonnées
              </h3>
              <div className="space-y-5">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={index}
                      className="info-item flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0 group-hover:bg-terracotta/20 transition-colors">
                        <IconComponent className="w-5 h-5 text-sage group-hover:text-terracotta transition-colors" />
                      </div>
                      <div>
                        <span className="block text-xs text-sage/50 font-sans uppercase tracking-wider mb-1">
                          {item.label}
                        </span>
                        <span className="text-sm md:text-base text-sage font-sans font-light">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA secondaire */}
            <div className="bg-sage rounded-2xl md:rounded-3xl p-6 md:p-8 text-white">
              <h3 className="text-xl font-serif mb-3">
                Visitez notre showroom
              </h3>
              <p className="text-white/70 font-sans font-light text-sm mb-4">
                Découvrez nos créations en personne et laissez-vous inspirer par nos univers.
              </p>
              <a
                href="#showroom"
                className="inline-flex items-center gap-2 text-terracotta font-sans text-sm font-medium group"
              >
                <span>Prendre rendez-vous</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Formulaire à droite */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-terracotta mb-4" />
                <h3 className="text-2xl font-serif text-sage mb-2">Message envoyé !</h3>
                <p className="text-sage/60 font-sans">Nous vous répondrons dans les 24h.</p>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  {/* Nom */}
                  <div className="form-field">
                    <label className="block text-xs text-sage/60 font-sans uppercase tracking-wider mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-linen/50 border border-sage/10 text-sage font-sans text-sm focus:outline-none focus:border-terracotta/50 focus:bg-white transition-all placeholder:text-sage/30"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  {/* Email */}
                  <div className="form-field">
                    <label className="block text-xs text-sage/60 font-sans uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-linen/50 border border-sage/10 text-sage font-sans text-sm focus:outline-none focus:border-terracotta/50 focus:bg-white transition-all placeholder:text-sage/30"
                      placeholder="jean@email.com"
                    />
                  </div>

                  {/* Téléphone */}
                  <div className="form-field">
                    <label className="block text-xs text-sage/60 font-sans uppercase tracking-wider mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-linen/50 border border-sage/10 text-sage font-sans text-sm focus:outline-none focus:border-terracotta/50 focus:bg-white transition-all placeholder:text-sage/30"
                      placeholder="+216 20 123 456"
                    />
                  </div>

                  {/* Sujet */}
                  <div className="form-field">
                    <label className="block text-xs text-sage/60 font-sans uppercase tracking-wider mb-2">
                      Sujet
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-linen/50 border border-sage/10 text-sage font-sans text-sm focus:outline-none focus:border-terracotta/50 focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Choisir un sujet</option>
                      <option value="amenagement">Aménagement d'intérieur</option>
                      <option value="scenographie">Scénographie événementielle</option>
                      <option value="conseil">Conseil personnalisé</option>
                      <option value="autre">Autre demande</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="form-field mb-6">
                  <label className="block text-xs text-sage/60 font-sans uppercase tracking-wider mb-2">
                    Votre message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-linen/50 border border-sage/10 text-sage font-sans text-sm focus:outline-none focus:border-terracotta/50 focus:bg-white transition-all resize-none placeholder:text-sage/30"
                    placeholder="Décrivez votre projet, vos envies, vos contraintes..."
                  />
                </div>

                {/* Bouton envoi */}
                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-sage text-white rounded-full px-8 py-4 font-sans text-sm font-medium hover:bg-terracotta transition-colors duration-300 group"
                >
                  <span>Envoyer mon message</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Send className="w-4 h-4" />
                  </div>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}