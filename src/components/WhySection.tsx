import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Zap, Target, Award, Rocket, Users } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'جودة عالية',
    description: 'كود نظيف ومعايير احترافية',
  },
  {
    icon: Zap,
    title: 'سرعة فائقة',
    description: 'تطوير سريع وتسليم في الوقت',
  },
  {
    icon: Target,
    title: 'دقة متناهية',
    description: 'اهتمام بأدق التفاصيل',
  },
  {
    icon: Award,
    title: 'خبرة واسعة',
    description: 'مشاريع ناجحة ومتنوعة',
  },
  {
    icon: Rocket,
    title: 'تقنيات حديثة',
    description: 'أحدث أدوات التطوير',
  },
  {
    icon: Users,
    title: 'دعم مستمر',
    description: 'متابعة وصيانة دائمة',
  },
];

export default function WhySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why" ref={ref} className="relative py-32 px-6">
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
              textShadow: '0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 60px #00ff00',
              letterSpacing: '0.05em',
            }}
          >
            WHY ALSHBH?
          </h2>
          <p className="text-xl text-neon-green/80 max-w-3xl mx-auto">
            لماذا تختار شركة الشبح للبرمجة؟ نحن نقدم أكثر من مجرد كود
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <motion.div
                className="relative p-8 rounded-2xl backdrop-blur-sm h-full"
                style={{
                  background: 'rgba(0, 0, 0, 0.7)',
                  border: '2px solid rgba(0, 255, 0, 0.3)',
                  boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)',
                }}
                whileHover={{
                  boxShadow: '0 0 40px rgba(0, 255, 0, 0.5)',
                  borderColor: 'rgba(0, 255, 0, 0.6)',
                  y: -10,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon container */}
                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto"
                  style={{
                    background: 'radial-gradient(circle, #00ff00 0%, transparent 70%)',
                    border: '2px solid #00ff00',
                    boxShadow: '0 0 30px rgba(0, 255, 0, 0.4)',
                  }}
                  whileHover={{
                    rotate: 360,
                    boxShadow: '0 0 50px rgba(0, 255, 0, 0.8)',
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <reason.icon
                    className="w-10 h-10 text-neon-green"
                    style={{
                      filter: 'drop-shadow(0 0 10px #00ff00)',
                    }}
                  />
                </motion.div>

                {/* Content */}
                <h3
                  className="text-2xl font-bold mb-3 text-center"
                  style={{
                    color: '#00ff00',
                    textShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
                  }}
                >
                  {reason.title}
                </h3>

                <p className="text-neon-green/70 text-center text-lg">
                  {reason.description}
                </p>

                {/* Animated corners */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                    <motion.div
                      key={corner}
                      className={`absolute w-6 h-6 border-neon-green ${
                        corner.includes('top') ? 'border-t-2' : 'border-b-2'
                      } ${corner.includes('left') ? 'border-l-2' : 'border-r-2'} ${
                        corner.includes('top') ? 'top-0' : 'bottom-0'
                      } ${corner.includes('left') ? 'left-0' : 'right-0'}`}
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      style={{
                        boxShadow: '0 0 10px #00ff00',
                      }}
                    />
                  ))}
                </div>

                {/* Cyber grid effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, 0.3) 25%, rgba(0, 255, 0, 0.3) 26%, transparent 27%),
                      linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, 0.3) 25%, rgba(0, 255, 0, 0.3) 26%, transparent 27%)
                    `,
                    backgroundSize: '15px 15px',
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <div
            className="relative w-64 h-1 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, #00ff00, transparent)',
              boxShadow: '0 0 20px #00ff00',
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #00ff00, transparent)',
                boxShadow: '0 0 30px #00ff00',
              }}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
