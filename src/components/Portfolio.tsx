import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    name: "Zahra Ink",
    url: "https://zahra.ink",
    description: "موقع إبداعي متطور",
    gradient: "from-primary to-secondary"
  },
  {
    name: "Mohaaa",
    url: "https://mohaaa.netlify.app",
    description: "تطبيق ويب تفاعلي",
    gradient: "from-secondary to-accent"
  },
  {
    name: "ElSharqawy",
    url: "https://elsharqawy.com",
    description: "منصة احترافية",
    gradient: "from-accent to-space-blue"
  },
  {
    name: "Magou Fashion",
    url: "https://magoufashion.store",
    description: "متجر أزياء عصري",
    gradient: "from-space-blue to-primary"
  }
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="portfolio" ref={ref} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 neon-text-pink">
            أعمالنا
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            مشاريع نفخر بإنجازها - كل واحد منها قصة نجاح فريدة
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              <div className="glass rounded-3xl p-8 md:p-12 transition-all duration-500 hover:scale-105 border-2 border-[#00ff88]/20 relative">
                {/* Energy lines connecting effect */}
                {hoveredIndex === index && (
                  <>
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent"
                    />
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
                      className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"
                    />
                  </>
                )}
                
                <motion.div
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <div className={`w-full h-48 rounded-2xl bg-gradient-to-br ${project.gradient} mb-6 flex items-center justify-center relative overflow-hidden border border-white/10`}>
                    {/* Holographic grid */}
                    <motion.div
                      animate={{
                        rotate: hoveredIndex === index ? 360 : 0,
                        opacity: hoveredIndex === index ? 1 : 0.5,
                      }}
                      transition={{ duration: 2, ease: "linear" }}
                      className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.2)_1px,transparent_1px)] bg-[length:20px_20px]"
                    />
                    
                    {/* Scanning line effect */}
                    {hoveredIndex === index && (
                      <motion.div
                        animate={{
                          y: [-200, 200],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent"
                      />
                    )}
                    
                    <span className="text-6xl font-bold text-white/20 relative z-10">
                      {project.name.charAt(0)}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold mb-3">
                    {project.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 text-lg">
                    {project.description}
                  </p>

                  <Button
                    variant="outline"
                    className="group/btn border-primary/50 hover:bg-primary hover:text-primary-foreground transition-all"
                    asChild
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      زيارة الموقع
                      <ExternalLink className="mr-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </motion.div>

                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.gradient} opacity-20 -z-10 blur-2xl`}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
