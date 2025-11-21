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
          <h2 className="text-5xl md:text-6xl font-bold mb-6 neon-text-purple">
            من نحن؟
          </h2>
          <div className="glass rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed">
              نحن فريق <span className="neon-text-pink font-bold">Alshbh</span>، نبني مواقع وتطبيقات خارج حدود العادي…
              <br />
              ندمج <span className="text-primary">التصميم</span>، <span className="text-secondary">الذكاء</span>، و<span className="text-accent">التحريك</span> لصناعة تجارب رقمية فضائية
            </p>
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
