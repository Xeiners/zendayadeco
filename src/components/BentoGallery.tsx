import { motion } from 'framer-motion';
import Bento1 from '../assets/img/img1.png';

const images = [
  {
    src: Bento1,
    alt: 'Salon lumineux avec vue sur la nature',
    span: 'col-span-2 row-span-2', // Grande image à gauche
  },
  {
    src: 'https://instagram.ftun10-1.fna.fbcdn.net/v/t51.82787-15/584402536_18059266088560657_4583537068108436853_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=Mzc2NzY3OTQ0MjgyMzcwODcwMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=rSn7XU0Z550Q7kNvwH6focD&_nc_oc=Adq00BiTSNEAYteojQ8tUn1qnCukE6KhXzuENZGWqFIVzGvo9ovHdJ55_gBThVMj7-g&_nc_ad=z-m&_nc_cid=1360&_nc_zt=23&_nc_ht=instagram.ftun10-1.fna&_nc_gid=jz9taLAlLvZ-5yY6zg2rYw&_nc_ss=7a22e&oh=00_Af70_L1dESyyP7gkL426Z6GOfu04PjNnTI-8ZZy4BReZsg&oe=6A0690ED',
    alt: 'Chambre minimaliste avec chevet en bois',
    span: 'col-span-1 row-span-1', // Petite image haut droite
  },
  {
    src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    alt: 'Fauteuil en rotin design',
    span: 'col-span-1 row-span-1', // Petite image milieu gauche
  },
  {
    src: 'https://instagram.ftun10-1.fna.fbcdn.net/v/t51.82787-15/584402536_18059266088560657_4583537068108436853_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=Mzc2NzY3OTQ0MjgyMzcwODcwMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=rSn7XU0Z550Q7kNvwH6focD&_nc_oc=Adq00BiTSNEAYteojQ8tUn1qnCukE6KhXzuENZGWqFIVzGvo9ovHdJ55_gBThVMj7-g&_nc_ad=z-m&_nc_cid=1360&_nc_zt=23&_nc_ht=instagram.ftun10-1.fna&_nc_gid=jz9taLAlLvZ-5yY6zg2rYw&_nc_ss=7a22e&oh=00_Af70_L1dESyyP7gkL426Z6GOfu04PjNnTI-8ZZy4BReZsg&oe=6A0690ED',
    alt: 'Armoire noire élégante',
    span: 'col-span-1 row-span-2', // Image haute droite
  },
  {
    src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80',
    alt: 'Entrée avec arche en terre cuite',
    span: 'col-span-1 row-span-1', // Petite image bas gauche
  },
  {
    src: 'https://instagram.ftun10-1.fna.fbcdn.net/v/t51.82787-15/555736372_17898282204293627_2678671129673604887_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=107&ig_cache_key=MzczMTY0Mzc2NjYzNDQ3OTk4MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5oZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=g8rtHJTutpUQ7kNvwGIL7GP&_nc_oc=Adrcp0UxvqEp3T5g5o4WhZdczaThJcRb-mdbb5-YLdr4Dz6gE7P9Lu2PumJbFNbyYLM&_nc_ad=z-m&_nc_cid=1360&_nc_zt=23&_nc_ht=instagram.ftun10-1.fna&_nc_gid=-oEvz2t5mcQgbiA5lYuANQ&_nc_ss=7a22e&oh=00_Af5t3DzA__F1E_yEgslEPZ_W6w-NcUy3uKw2kpAWJwOrCA&oe=6A067B27',
    alt: 'Entrée avec arche en terre cuite',
    span: 'col-span-1 row-span-2', // Petite image bas gauche
  },
  {
    src: 'https://instagram.ftun10-2.fna.fbcdn.net/v/t51.82787-15/649228953_18070488185560657_8525047831586548348_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=106&ig_cache_key=Mzg0OTE0NjUyNzEyMjIwNTM4MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=yPtpMJzuakYQ7kNvwHIGz1F&_nc_oc=AdpZtxW_FlzbZ2z726D16xN2fkgWxUrvC8qZwo5_hyHR9157MgU-m8GWNb__4qigK1Y&_nc_ad=z-m&_nc_cid=1360&_nc_zt=23&_nc_ht=instagram.ftun10-2.fna&_nc_gid=jz9taLAlLvZ-5yY6zg2rYw&_nc_ss=7a22e&oh=00_Af7_OotNcb8_y99KefYIRDpJqQ8L07mUnkI7CpJ8FCvkBw&oe=6A069C89',
    alt: 'Ambiance douce, matières naturelles et couleurs chaudes…',
    span: 'col-span-1 row-span-1', // Petite image bas gauche
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
        ease: 'easeInOut' as const,
    },
  },
};

export default function BentoGallery() {
  return (
    <section id="collections" className="w-full py-20 md:py-32 px-6 md:px-10 bg-linen">
      <div id="showroom" className="h-0 scroll-mt-28 md:scroll-mt-32" aria-hidden="true" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-4">
            Nos Univers
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-sage leading-tight">
            Inspirations &<br />Créations
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-3 auto-rows-[200px] md:auto-rows-[250px]"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`
                relative overflow-hidden rounded-2xl md:rounded-3xl
                cursor-pointer group
                ${image.span}
              `}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay au hover */}
              <div className="absolute inset-0 bg-sage/0 group-hover:bg-sage/20 transition-colors duration-500" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-white font-sans text-sm md:text-base font-medium drop-shadow-lg">
                  {image.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}