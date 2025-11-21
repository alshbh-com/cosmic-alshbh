import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Globe, Smartphone, Brain, Palette, RefreshCw, Server } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: Globe,
    title: "تطوير مواقع",
    description: "مواقع احترافية سريعة ومتجاوبة مع جميع الأجهزة",
    color: "from-primary/20 to-primary/10",
    iconColor: "text-primary"
  },
  {
    icon: Smartphone,
    title: "تطبيقات الويب",
    description: "تطبيقات ويب تفاعلية بتقنيات حديثة",
    color: "from-secondary/20 to-secondary/10",
    iconColor: "text-secondary"
  },
  {
    icon: Brain,
    title: "الذكاء الاصطناعي",
    description: "دمج تقنيات الذكاء الاصطناعي في مشاريعك",
    color: "from-accent/20 to-accent/10",
    iconColor: "text-accent"
  },
  {
    icon: Palette,
    title: "تصميم UI/UX",
    description: "تصاميم عصرية تجمع بين الجمال والوظيفة",
    color: "from-space-blue/20 to-space-blue/10",
    iconColor: "text-space-blue"
  },
  {
    icon: RefreshCw,
    title: "تحويل لتطبيقات",
    description: "تحويل مواقعك إلى تطبيقات موبايل",
    color: "from-space-pink/20 to-space-pink/10",
    iconColor: "text-space-pink"
  },
  {
    icon: Server,
    title: "إدارة السيرفر",
    description: "استضافة وإدارة احترافية لمشاريعك",
    color: "from-space-purple/20 to-space-purple/10",
    iconColor: "text-space-purple"
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
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 neon-text">
            خدماتنا
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            نقدم مجموعة شاملة من الخدمات الرقمية لتحويل أفكارك إلى واقع
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={cn(
                "relative glass rounded-2xl p-8 cursor-pointer transition-all duration-500",
                hoveredIndex === index ? "scale-110 z-10" : "scale-100"
              )}
            >
              <motion.div
                animate={{
                  rotate: hoveredIndex === index ? 360 : 0,
                }}
                transition={{ duration: 0.8 }}
                className={cn(
                  "w-20 h-20 rounded-full bg-gradient-to-br",
                  service.color,
                  "flex items-center justify-center mb-6 mx-auto"
                )}
              >
                <service.icon className={cn("w-10 h-10", service.iconColor)} />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4 text-center">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground text-center leading-relaxed">
                {service.description}
              </p>

              {hoveredIndex === index && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 -z-10 blur-xl"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
