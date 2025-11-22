import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Globe, Smartphone, Brain, Palette, RefreshCw, Server } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "مواقع احترافية سريعة ومتجاوبة",
    orbit: 0,
  },
  {
    icon: Smartphone,
    title: "Apps",
    description: "تطبيقات ويب تفاعلية حديثة",
    orbit: 60,
  },
  {
    icon: Brain,
    title: "AI Systems",
    description: "دمج الذكاء الاصطناعي المتقدم",
    orbit: 120,
  },
  {
    icon: Palette,
    title: "UI/UX",
    description: "تصاميم عصرية مبتكرة",
    orbit: 180,
  },
  {
    icon: RefreshCw,
    title: "WebView Apps",
    description: "تحويل مواقع لتطبيقات موبايل",
    orbit: 240,
  },
  {
    icon: Server,
    title: "Hosting",
    description: "استضافة وإدارة احترافية",
    orbit: 300,
  }
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" ref={ref} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <h2 
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{
              color: '#00ff00',
              textShadow: '0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 60px #00ff00'
            }}
          >
            ORBITING SERVICES
          </h2>
          <p className="text-xl text-neon-green/80 max-w-3xl mx-auto">
            خدماتنا تدور حولك كالكواكب - اختر ما تحتاجه من عالمنا الرقمي
          </p>
        </motion.div>

        {/* Orbital system */}
        <div className="relative min-h-[800px] flex items-center justify-center">
          {/* Central energy core */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            animate={{
              scale: [1, 1.2, 1],
              rotate: 360
            }}
            transition={{
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          >
            <div 
              className="w-32 h-32 rounded-full"
              style={{
                background: 'radial-gradient(circle, #00ff00 0%, transparent 70%)',
                boxShadow: '0 0 60px #00ff00, 0 0 120px #00ff00, inset 0 0 40px #00ff00'
              }}
            />
          </motion.div>

          {/* Orbit rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-green/20"
              style={{
                width: `${ring * 250}px`,
                height: `${ring * 250}px`,
              }}
              animate={{
                rotate: ring % 2 === 0 ? 360 : -360
              }}
              transition={{
                duration: 40 * ring,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}

          {/* Service planets */}
          {services.map((service, index) => {
            const angle = (service.orbit * Math.PI) / 180;
            const radius = 300;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={index}
                className="absolute top-1/2 left-1/2 cursor-pointer"
                style={{
                  x: x - 100,
                  y: y - 100,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Planet sphere */}
                <motion.div
                  className="relative w-40 h-40"
                  animate={{
                    rotate: hoveredIndex === index ? 360 : 0,
                    scale: hoveredIndex === index ? 1.3 : 1
                  }}
                  transition={{
                    rotate: { duration: 2, ease: "linear" },
                    scale: { duration: 0.3 }
                  }}
                >
                  {/* Planet glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, #00ff00 0%, #004400 50%, #000000 100%)',
                      boxShadow: hoveredIndex === index 
                        ? '0 0 60px #00ff00, inset 0 0 40px rgba(0, 255, 0, 0.3)'
                        : '0 0 30px #00ff00, inset 0 0 20px rgba(0, 255, 0, 0.2)'
                    }}
                    animate={{
                      boxShadow: hoveredIndex === index 
                        ? [
                            '0 0 60px #00ff00, inset 0 0 40px rgba(0, 255, 0, 0.3)',
                            '0 0 100px #00ff00, inset 0 0 60px rgba(0, 255, 0, 0.5)',
                            '0 0 60px #00ff00, inset 0 0 40px rgba(0, 255, 0, 0.3)'
                          ]
                        : '0 0 30px #00ff00, inset 0 0 20px rgba(0, 255, 0, 0.2)'
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <service.icon 
                      className="w-16 h-16 text-neon-green relative z-10" 
                      style={{
                        filter: 'drop-shadow(0 0 20px #00ff00)'
                      }}
                    />
                  </div>

                  {/* Orbit trail particles */}
                  {hoveredIndex === index && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full bg-neon-green"
                          style={{
                            boxShadow: '0 0 10px #00ff00',
                            left: '50%',
                            top: '50%'
                          }}
                          animate={{
                            x: [0, Math.cos((i * 45 * Math.PI) / 180) * 100],
                            y: [0, Math.sin((i * 45 * Math.PI) / 180) * 100],
                            opacity: [1, 0],
                            scale: [1, 0]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.1
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>

                {/* Service info - appears on hover */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: -20, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.8 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 p-6 rounded-2xl backdrop-blur-md z-20"
                      style={{
                        background: 'rgba(0, 0, 0, 0.9)',
                        border: '2px solid #00ff00',
                        boxShadow: '0 0 40px rgba(0, 255, 0, 0.5)'
                      }}
                    >
                      <h3 
                        className="text-2xl font-bold mb-2 text-center"
                        style={{
                          color: '#00ff00',
                          textShadow: '0 0 10px #00ff00'
                        }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-neon-green/70 text-center text-sm">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom instruction */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center text-neon-green/60 mt-16"
        >
          مرر الماوس على الكواكب لاستكشاف الخدمات
        </motion.p>
      </div>
    </section>
  );
}
