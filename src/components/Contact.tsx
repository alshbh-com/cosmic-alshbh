import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const whatsappNumber = "201204486263";
  const whatsappMessage = encodeURIComponent("مرحبًا، أريد الاستفسار عن خدمات Alshbh");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{
              color: '#00ff00',
              textShadow: '0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 60px #00ff00'
            }}
          >
            CONTACT PORTAL
          </h2>
          <p className="text-xl text-neon-green/80">
            افتح بوابة الاتصال وتواصل معنا عبر الأبعاد الرقمية
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="relative mx-auto mb-16 flex items-center justify-center"
            style={{ height: '400px' }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2"
                style={{
                  width: `${150 + i * 50}px`,
                  height: `${150 + i * 50}px`,
                  borderColor: '#00ff00',
                  boxShadow: `0 0 ${20 + i * 5}px rgba(0, 255, 0, 0.${8 - i})`
                }}
                animate={{
                  rotate: i % 2 === 0 ? 360 : -360,
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  rotate: {
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }
                }}
              />
            ))}

            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const radius = 200;
              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-3 h-3 rounded-full bg-neon-green"
                  style={{
                    boxShadow: '0 0 15px #00ff00',
                    left: '50%',
                    top: '50%'
                  }}
                  animate={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "linear"
                  }}
                />
              );
            })}

            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="relative px-16 py-12 text-2xl font-bold rounded-full border-4 border-neon-green bg-black hover:bg-neon-green/20 text-neon-green overflow-hidden group"
                style={{
                  boxShadow: '0 0 60px #00ff00, inset 0 0 40px rgba(0, 255, 0, 0.2)',
                  animation: 'energy-pulse 2s ease-in-out infinite'
                }}
                asChild
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-10 h-10 ml-4" />
                  <span className="relative z-10">OPEN CHANNEL</span>
                  
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                    style={{
                      background: 'radial-gradient(circle, #00ff00 0%, transparent 70%)'
                    }}
                  />
                </a>
              </Button>

              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-neon-green text-sm font-bold tracking-widest"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                style={{
                  textShadow: '0 0 10px #00ff00'
                }}
              >
                ↓ ACTIVE ↓
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl backdrop-blur-md border-2 border-neon-green/30"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                boxShadow: '0 0 30px rgba(0, 255, 0, 0.2)'
              }}
            >
              <MessageCircle 
                className="w-12 h-12 text-neon-green mb-4"
                style={{ filter: 'drop-shadow(0 0 10px #00ff00)' }}
              />
              <h3 
                className="text-2xl font-bold mb-2"
                style={{
                  color: '#00ff00',
                  textShadow: '0 0 10px #00ff00'
                }}
              >
                WhatsApp
              </h3>
              <p className="text-neon-green/70 mb-4 font-mono">
                +{whatsappNumber}
              </p>
              <p className="text-neon-green/60 text-sm">
                تواصل معنا مباشرة عبر واتساب
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl backdrop-blur-md border-2 border-neon-green/30"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                boxShadow: '0 0 30px rgba(0, 255, 0, 0.2)'
              }}
            >
              <Mail 
                className="w-12 h-12 text-neon-green mb-4"
                style={{ filter: 'drop-shadow(0 0 10px #00ff00)' }}
              />
              <h3 
                className="text-2xl font-bold mb-2"
                style={{
                  color: '#00ff00',
                  textShadow: '0 0 10px #00ff00'
                }}
              >
                Email
              </h3>
              <p className="text-neon-green/70 mb-4 font-mono">
                info@alshbh.space
              </p>
              <p className="text-neon-green/60 text-sm">
                راسلنا عبر البريد الإلكتروني
              </p>
            </motion.div>
          </motion.div>

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 bg-neon-green/30"
                style={{
                  height: '20px',
                  left: `${Math.random() * 100}%`,
                  boxShadow: '0 0 5px #00ff00'
                }}
                animate={{
                  y: [-50, 800],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p 
            className="text-2xl font-bold mb-2"
            style={{
              color: '#00ff00',
              textShadow: '0 0 15px #00ff00'
            }}
          >
            شركة الشبح للبرمجة
          </p>
          <p className="text-neon-green/60">
            ALSHBH - Beyond Coding, Beyond Reality
          </p>
        </motion.div>
      </div>
    </section>
  );
}
