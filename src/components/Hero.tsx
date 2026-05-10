import { motion } from 'framer-motion';
// import HeroBadge from './Herobadge';
import BottomLeftCard from './BottomLeftCard';
import BottomRightCorner from './BottomRightCorner';

const easeOutQuad = "easeOut";

export default function Hero() {
  return (
    <div className="w-full h-screen flex items-center justify-center p-3 md:p-5 bg-linen">
      <section className="relative w-full max-w-[1536px] h-full rounded-3xl md:rounded-[3rem] overflow-hidden shadow-none flex flex-col items-center bg-white/10 group">
        {/* Image Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          {/* <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80"
            alt="Intérieur bohème avec rotin et céramique artisanale"
            className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center"
          /> */}
          <video
            autoPlay
            muted
            loop
            playsInline
            // src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260422_191657_800d4e1f-7ab3-41af-90b6-9bd3039eb294.mp4"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_074327_a4d6275d-82d9-4c83-bfbe-f1fb2213c17c.mp4"
            className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center"
          />
          <div className="absolute inset-0 bg-sage/50" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 w-full h-full flex flex-col items-center">
          

          {/* Text Container */}
          <div className="w-full flex flex-col items-center pt-8 px-6 text-center max-w-4xl mb-auto mt-35  lg:mt-50">
            {/* <HeroBadge /> */}

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-serif font-normal text-white mb-2 tracking-tight leading-[1.05]"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              L'art de vivre
              <br />
              entre terre & lumière
            </motion.h1>

            <motion.p
              className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-xl font-sans font-normal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Des créations uniques en rotin, céramique et matières naturelles pour sublimer votre intérieur.
            </motion.p>

            <motion.a
              href="#collections"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: easeOutQuad }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full px-6 py-3 font-sans text-sm hover:bg-white/30 transition-colors"
            >
              Découvrir les créations
            </motion.a>
          </div>

          <BottomLeftCard />
          <BottomRightCorner />
        </div>
      </section>
    </div>
  );
}