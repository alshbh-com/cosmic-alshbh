import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Sparkles, Zap } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Code2,
      title: "تطوير احترافي",
      description: "نستخدم أحدث التقنيات لبناء تطبيقات سريعة وآمنة"
    },
    {
      icon: Sparkles,
      title: "تصميم مبتكر",
      description: "واجهات مستخدم فريدة تترك انطباعاً لا يُنسى"
    },
    {
      icon: Zap,
      title: "أداء فائق",
      description: "تحسين متقدم لضمان تجربة سلسة وسريعة"
    }
  ];

  return (
    <section id="about" ref={ref} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #ffeb3b 50%, #00ff00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(0, 212, 255, 0.5)'
            }}
          >
            من نحن؟
          </h2>
          
          <div className="glass rounded-3xl p-12 mb-12 relative overflow-hidden border-2 border-neon-blue/30">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, rgba(255, 235, 59, 0.1) 50%, rgba(0, 255, 0, 0.2) 100%)',
                filter: 'blur(60px)'
              }}
              className="absolute inset-0"
            />
            
            {/* Holographic grid effect - Multi-color */}
            <div className="absolute inset-0 opacity-10" 
                 style={{
                   backgroundImage: `
                     linear-gradient(#00d4ff 1px, transparent 1px), 
                     linear-gradient(90deg, #ffeb3b 1px, transparent 1px)
                   `,
                   backgroundSize: '50px 50px'
                 }}
            />
            
            <div className="relative z-10">
              <motion.div
                className="mb-8"
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <h3 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                  <span 
                    style={{
                      background: 'linear-gradient(135deg, #00d4ff 0%, #ffeb3b 50%, #00ff00 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    شركة الشبح للبرمجة
                  </span>
                </h3>
              </motion.div>
              
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-2xl md:text-3xl font-light leading-relaxed mb-8 text-center"
              >
                <motion.span 
                  style={{ color: '#00d4ff' }}
                  animate={{
                    textShadow: [
                      '0 0 10px #00d4ff',
                      '0 0 25px #00d4ff',
                      '0 0 10px #00d4ff',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  نحن فريق ALSHBH
                </motion.span>
                {' '}
                <span style={{ color: '#ffeb3b' }}>
                  - شركة تشبه المستقبل
                </span>
                {' '}
                <span className="text-foreground">
                  نبني مواقع وتطبيقات خارج حدود العادي، ندمج التصميم، الذكاء الاصطناعي، والتحريك ثلاثي الأبعاد لصناعة تجارب رقمية Cyberpunk فريدة من نوعها
                </span>
              </motion.div>
              
              <motion.p
                className="text-lg md:text-xl text-muted-foreground text-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
              >
                نحول أفكارك إلى واقع رقمي يتجاوز الخيال 🚀
              </motion.p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="glass rounded-xl p-8 hover:scale-105 transition-transform duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 mx-auto group-hover:animate-glow">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">{feature.title}</h3>
              <p className="text-muted-foreground text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
