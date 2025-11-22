import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import MagneticButton from '@/components/MagneticButton';

const projects = [
  {
    name: "Zahra Ink",
    url: "https://zahra.ink",
    description: "موقع إبداعي متطور",
    color: "#00ff00",
    thumbnail: "Z"
  },
  {
    name: "Mohaaa",
    url: "https://mohaaa.netlify.app",
    description: "تطبيق ويب تفاعلي",
    color: "#00dd00",
    thumbnail: "M"
  },
  {
    name: "ElSharqawy",
    url: "https://elsharqawy.com",
    description: "منصة احترافية",
    color: "#00cc00",
    thumbnail: "E"
  },
  {
    name: "Magou Fashion",
    url: "https://magoufashion.store",
    description: "متجر أزياء عصري",
    color: "#00bb00",
    thumbnail: "MF"
  }
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isInView) {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            opacity: 0,
            y: 100,
            rotationX: -30,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
          });
        }
      });
    }
  }, [isInView]);

  return (
    <section id="portfolio" ref={ref} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
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
            HOLOGRAPHIC GALLERY
          </h2>
          <p className="text-xl text-neon-green/80 max-w-3xl mx-auto">
            مشاريع نفخر بإنجازها - معروضة في شاشات هولوغرام ثلاثية الأبعاد
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group perspective-1000"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="relative p-8 rounded-3xl border-2 border-neon-green/30 backdrop-blur-sm"
                style={{
                  background: 'rgba(0, 0, 0, 0.7)',
                  boxShadow: hoveredIndex === index 
                    ? '0 0 60px #00ff00, inset 0 0 40px rgba(0, 255, 0, 0.1)'
                    : '0 0 30px #00ff00, inset 0 0 20px rgba(0, 255, 0, 0.05)',
                  transform: hoveredIndex === index ? 'translateZ(20px)' : 'translateZ(0px)',
                  transition: 'all 0.5s ease'
                }}
              >
                {hoveredIndex === index && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="absolute inset-x-0 h-1 bg-neon-green"
                        style={{
                          boxShadow: '0 0 20px #00ff00'
                        }}
                        animate={{
                          y: [-20, 400],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </motion.div>

                    {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                      <motion.div
                        key={corner}
                        className={`absolute w-8 h-8 border-neon-green ${
                          corner.includes('top') ? 'border-t-2' : 'border-b-2'
                        } ${
                          corner.includes('left') ? 'border-l-2' : 'border-r-2'
                        } ${
                          corner.includes('top') ? 'top-0' : 'bottom-0'
                        } ${
                          corner.includes('left') ? 'left-0' : 'right-0'
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                          boxShadow: '0 0 10px #00ff00'
                        }}
                      />
                    ))}
                  </>
                )}

                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, 0.3) 25%, rgba(0, 255, 0, 0.3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.3) 75%, rgba(0, 255, 0, 0.3) 76%, transparent 77%, transparent),
                      linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, 0.3) 25%, rgba(0, 255, 0, 0.3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.3) 75%, rgba(0, 255, 0, 0.3) 76%, transparent 77%, transparent)
                    `,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0'
                  }}
                  animate={{
                    backgroundPosition: hoveredIndex === index 
                      ? ['0px 0px', '20px 20px']
                      : '0px 0px'
                  }}
                  transition={{
                    duration: 1,
                    repeat: hoveredIndex === index ? Infinity : 0,
                    ease: "linear"
                  }}
                />

                <div className="relative z-10">
                  <motion.div 
                    className="w-full h-56 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: `radial-gradient(circle at center, ${project.color} 0%, transparent 70%)`,
                      border: `2px solid ${project.color}`,
                      boxShadow: `0 0 40px ${project.color}`
                    }}
                    animate={{
                      boxShadow: hoveredIndex === index 
                        ? [`0 0 40px ${project.color}`, `0 0 80px ${project.color}`, `0 0 40px ${project.color}`]
                        : `0 0 40px ${project.color}`
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle at center, ${project.color}40 1px, transparent 1px)`,
                        backgroundSize: '30px 30px'
                      }}
                      animate={{
                        rotate: hoveredIndex === index ? 360 : 0,
                        scale: hoveredIndex === index ? 1.2 : 1
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 0.5 }
                      }}
                    />
                    
                    <span 
                      className="text-8xl font-bold relative z-10"
                      style={{
                        color: project.color,
                        textShadow: `0 0 30px ${project.color}`
                      }}
                    >
                      {project.name.charAt(0)}
                    </span>
                  </motion.div>

                  <h3 
                    className="text-3xl font-bold mb-3"
                    style={{
                      color: project.color,
                      textShadow: `0 0 20px ${project.color}`
                    }}
                  >
                    {project.name}
                  </h3>
                  
                  <p className="text-neon-green/70 mb-6 text-lg">
                    {project.description}
                  </p>

                  <MagneticButton strength={0.15}>
                    <Button
                      variant="outline"
                      className="border-2 border-neon-green bg-transparent hover:bg-neon-green/10 text-neon-green transition-all group/btn"
                      style={{
                        boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)'
                      }}
                      asChild
                    >
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        ACCESS HOLOGRAM
                        <ExternalLink className="mr-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </MagneticButton>
                </div>

                {hoveredIndex === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          background: project.color,
                          boxShadow: `0 0 10px ${project.color}`,
                          left: `${10 + i * 12}%`,
                          top: '50%'
                        }}
                        animate={{
                          y: [0, -50, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
