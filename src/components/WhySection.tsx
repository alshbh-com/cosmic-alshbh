import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Shield, Sparkles, Award, Cpu, Headphones, Lock, Rocket } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: "سرعة",
    description: "تطوير وتسليم سريع مع أداء فائق",
    color: "#ffeb3b"
  },
  {
    icon: Lock,
    title: "أمان",
    description: "حماية متقدمة لبياناتك ومشاريعك",
    color: "#00d4ff"
  },
  {
    icon: Rocket,
    title: "ابتكار",
    description: "تصاميم وأفكار من عالم المستقبل",
    color: "#00ff00"
  },
  {
    icon: Award,
    title: "جودة",
    description: "معايير احترافية Cyberpunk في كل مشروع",
    color: "#ff00ff"
  },
  {
    icon: Cpu,
    title: "ذكاء اصطناعي",
    description: "دمج AI متقدم في مشاريعك",
    color: "#00d4ff"
  },
  {
    icon: Headphones,
    title: "دعم مستمر",
    description: "نبقى معك في كل مرحلة",
    color: "#ffeb3b"
  }
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
              background: 'linear-gradient(135deg, #00d4ff 0%, #ffeb3b 50%, #00ff00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(0, 212, 255, 0.6)'
            }}
          >
            ليه تختارنا؟
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#00d4ff' }}>
            لأننا نجمع بين التكنولوجيا المتقدمة والإبداع الخيالي من عالم Cyberpunk
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
                  border: `2px solid ${reason.color}40`,
                  boxShadow: `0 0 20px ${reason.color}30`,
                }}
                whileHover={{
                  boxShadow: `0 0 40px ${reason.color}60`,
                  borderColor: `${reason.color}80`,
                  y: -10,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto"
                  style={{
                    background: `radial-gradient(circle, ${reason.color} 0%, transparent 70%)`,
                    border: `2px solid ${reason.color}`,
                    boxShadow: `0 0 30px ${reason.color}40`,
                  }}
                  whileHover={{
                    rotate: 360,
                    boxShadow: `0 0 50px ${reason.color}80`,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <reason.icon
                    className="w-10 h-10"
                    style={{
                      color: reason.color,
                      filter: `drop-shadow(0 0 10px ${reason.color})`,
                    }}
                  />
                </motion.div>

                <h3
                  className="text-2xl font-bold mb-3 text-center"
                  style={{
                    color: reason.color,
                    textShadow: `0 0 10px ${reason.color}80`,
                  }}
                >
                  {reason.title}
                </h3>

                <p className="text-center text-lg" style={{ color: '#aaa' }}>
                  {reason.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
