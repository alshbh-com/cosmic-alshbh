import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const phoneNumber = "01204486263";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('مرحباً، أريد الاستفسار عن خدماتكم')}`;

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 neon-text">
            تواصل معنا
          </h2>
          
          <div className="glass rounded-3xl p-12 relative overflow-hidden">
            {/* Portal effect background */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 opacity-30 blur-3xl"
            />

            <div className="relative z-10">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mb-8"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center pulse-glow">
                  <MessageCircle className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              <h3 className="text-3xl font-bold mb-6">
                ابدأ مشروعك الآن
              </h3>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                هل لديك فكرة مشروع؟ تواصل معنا عبر واتساب وسنحولها إلى واقع رقمي مذهل
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="flex items-center gap-2 text-primary">
                  <Phone className="w-5 h-5" />
                  <span className="font-mono text-lg">{phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <Mail className="w-5 h-5" />
                  <span>info@alshbh.com</span>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-8 py-6 text-xl rounded-xl pulse-glow group"
                  asChild
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="ml-2 w-6 h-6 group-hover:rotate-12 transition-transform" />
                    تواصل عبر واتساب
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="text-center mt-20 text-muted-foreground"
      >
        <p className="text-lg">
          © 2024 Alshbh. All rights reserved.
        </p>
        <p className="text-sm mt-2 neon-text-purple">
          Beyond Coding - نحو المستقبل الرقمي 🚀
        </p>
      </motion.div>
    </section>
  );
}
