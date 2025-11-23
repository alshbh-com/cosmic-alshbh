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
    }, 3000);

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
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-7xl md:text-9xl font-bold mb-8 tracking-widest"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #ffeb3b 50%, #00ff00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{
                  textShadow: [
                    '0 0 20px #00d4ff, 0 0 40px #00d4ff',
                    '0 0 20px #ffeb3b, 0 0 40px #ffeb3b',
                    '0 0 20px #00ff00, 0 0 40px #00ff00',
                    '0 0 20px #00d4ff, 0 0 40px #00d4ff',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                𝘼𝙇𝙎𝙃𝘽𝙃
              </motion.h1>

              <motion.div
                className="text-2xl md:text-3xl font-light tracking-wider mb-3"
                style={{
                  color: '#00d4ff',
                  textShadow: '0 0 15px #00d4ff',
                }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                  color: ['#00d4ff', '#ffeb3b', '#00ff00', '#00d4ff']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ALSHBH SYSTEM LOADING
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ...
                </motion.span>
              </motion.div>

              <motion.div
                className="w-80 h-2 bg-black/50 rounded-full overflow-hidden mx-auto border"
                style={{
                  borderColor: '#00d4ff'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #00d4ff, #ffeb3b, #00ff00)',
                    boxShadow: '0 0 20px #00d4ff',
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: 'easeInOut' }}
                />
              </motion.div>

              <motion.div
                className="absolute bottom-20 left-1/2 -translate-x-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <div
                  className="w-16 h-16 rounded-full border-4 border-transparent"
                  style={{
                    borderTopColor: '#00d4ff',
                    borderRightColor: '#ffeb3b',
                    borderBottomColor: '#00ff00',
                    boxShadow: '0 0 25px rgba(0, 212, 255, 0.6)',
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute inset-0 overflow-hidden opacity-30">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1"
                style={{
                  height: '100px',
                  left: `${(i / 30) * 100}%`,
                  background: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#ffeb3b' : '#00ff00',
                  boxShadow: `0 0 10px ${i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#ffeb3b' : '#00ff00'}`,
                }}
                animate={{
                  y: [-100, window.innerHeight + 100],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
