import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [isEntering, setIsEntering] = useState(false);

  const handleEnterSpace = () => {
    setIsEntering(true);
    setTimeout(() => {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setIsEntering(false), 1000);
    }, 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <AnimatePresence>
        {isEntering && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 20, opacity: 1 }}
            exit={{ scale: 30, opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            <div className="absolute inset-0 bg-black" />
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 border-2 border-neon-green rounded-full"
                initial={{ 
                  width: 0, 
                  height: 0,
                  x: '-50%',
                  y: '-50%',
                  opacity: 0
                }}
                animate={{ 
                  width: `${(i + 1) * 100}%`, 
                  height: `${(i + 1) * 100}%`,
                  opacity: [0, 0.8, 0]
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-7xl md:text-9xl font-bold mb-8 relative"
            style={{
              textShadow: `
                0 0 10px #00ff00,
                0 0 20px #00ff00,
                0 0 40px #00ff00,
                0 0 80px #00ff00,
                0 0 120px #00ff00
              `,
              color: '#00ff00',
              letterSpacing: '0.1em'
            }}
            animate={{
              textShadow: [
                '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 80px #00ff00',
                '0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 80px #00ff00, 0 0 120px #00ff00',
                '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 80px #00ff00',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.span
              className="relative inline-block"
              animate={{
                opacity: [1, 0.9, 1, 0.95, 1],
                x: [0, -3, 3, -2, 0],
                textShadow: [
                  '2px 2px 0px #ff0000, -2px -2px 0px #00ff00',
                  '0px 0px 0px #ff0000, 0px 0px 0px #00ff00',
                  '2px 2px 0px #ff0000, -2px -2px 0px #00ff00',
                ]
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              𝘼𝙇𝙎𝙃𝘽𝙃
            </motion.span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-6"
          >
            <h2 className="text-3xl md:text-5xl font-light mb-2" style={{
              color: '#00ff00',
              textShadow: '0 0 20px #00ff00, 0 0 40px #00ff00'
            }}>
              Beyond Coding
            </h2>
            <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-neon-green to-transparent animate-pulse" />
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              color: '#00ff00',
              textShadow: '0 0 10px rgba(0, 255, 0, 0.5)'
            }}
          >
            شركة الشبح للبرمجة - نبني عوالم رقمية خارج حدود الواقع
            <br />
            <span className="text-sm opacity-80">
              مواقع • تطبيقات • ذكاء اصطناعي • تصميم UI/UX
            </span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Button 
              size="lg"
              onClick={handleEnterSpace}
              disabled={isEntering}
              className="group relative overflow-hidden px-12 py-8 text-xl font-bold rounded-2xl border-4 border-neon-green bg-black hover:bg-neon-green/10 text-neon-green transition-all duration-300"
              style={{
                boxShadow: '0 0 30px #00ff00, inset 0 0 30px rgba(0, 255, 0, 0.2)',
                animation: 'energy-pulse 2s ease-in-out infinite'
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                {isEntering ? 'ENTERING SPACE...' : 'ENTER SPACE'}
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </span>
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </Button>
          </motion.div>

          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-neon-green"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: '0 0 20px #00ff00, 0 0 40px #00ff00'
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)'
        }}
      />
    </section>
  );
}
