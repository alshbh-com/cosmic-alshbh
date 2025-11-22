import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          {/* Matrix lines background */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px bg-neon-green"
                style={{
                  left: `${(i / 30) * 100}%`,
                  height: '100%',
                }}
                initial={{ y: '-100%' }}
                animate={{ y: '100%' }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          {/* Main text */}
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold mb-4"
                style={{
                  color: '#00ff00',
                  textShadow: '0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 60px #00ff00, 0 0 80px #00ff00',
                  letterSpacing: '0.2em',
                }}
                animate={{
                  textShadow: [
                    '0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 60px #00ff00',
                    '0 0 30px #00ff00, 0 0 60px #00ff00, 0 0 90px #00ff00',
                    '0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 60px #00ff00',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ALSHBH
              </motion.h1>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-1 bg-neon-green mx-auto mb-6"
                style={{
                  boxShadow: '0 0 20px #00ff00',
                  maxWidth: '400px',
                }}
              />

              <motion.p
                className="text-2xl md:text-3xl"
                style={{
                  color: '#00ff00',
                  textShadow: '0 0 10px #00ff00',
                  letterSpacing: '0.15em',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, times: [0, 0.2, 0.8, 1] }}
              >
                SYSTEM LOADING...
              </motion.p>

              {/* Loading dots */}
              <div className="flex justify-center gap-3 mt-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-neon-green"
                    style={{
                      boxShadow: '0 0 10px #00ff00',
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Circular loading indicator */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-neon-green/30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                boxShadow: '0 0 40px rgba(0, 255, 0, 0.3)',
              }}
            />
          </div>

          {/* Corner brackets */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
            <motion.div
              key={corner}
              className={`absolute w-20 h-20 border-neon-green ${
                corner.includes('top') ? 'border-t-4' : 'border-b-4'
              } ${corner.includes('left') ? 'border-l-4' : 'border-r-4'} ${
                corner.includes('top') ? 'top-8' : 'bottom-8'
              } ${corner.includes('left') ? 'left-8' : 'right-8'}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                boxShadow: '0 0 20px #00ff00',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
