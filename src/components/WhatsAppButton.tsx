import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/201204486263"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: 'rgba(0, 0, 0, 0.9)',
          border: '3px solid #00ff00',
          boxShadow: '0 0 30px #00ff00, inset 0 0 20px rgba(0, 255, 0, 0.2)',
        }}
        animate={{
          boxShadow: [
            '0 0 30px #00ff00, inset 0 0 20px rgba(0, 255, 0, 0.2)',
            '0 0 50px #00ff00, inset 0 0 30px rgba(0, 255, 0, 0.4)',
            '0 0 30px #00ff00, inset 0 0 20px rgba(0, 255, 0, 0.2)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <MessageCircle className="w-8 h-8 text-neon-green" />

        {/* Ping animation */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-neon-green"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 rounded-lg backdrop-blur-md pointer-events-none"
        style={{
          background: 'rgba(0, 0, 0, 0.9)',
          border: '2px solid #00ff00',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
        }}
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span
          className="text-sm font-bold"
          style={{
            color: '#00ff00',
            textShadow: '0 0 10px #00ff00',
          }}
        >
          تواصل معنا
        </span>
      </motion.div>
    </motion.a>
  );
}
