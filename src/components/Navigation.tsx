import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'الرئيسية', href: '#' },
  { name: 'من نحن', href: '#about' },
  { name: 'الخدمات', href: '#services' },
  { name: 'أعمالنا', href: '#portfolio' },
  { name: 'تواصل معنا', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl font-bold neon-text"
            whileHover={{ scale: 1.05 }}
          >
            Alshbh
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors relative group"
                whileHover={{ scale: 1.05 }}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.href === '#') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            
            <Button 
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground pulse-glow"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              ابدأ الآن
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 glass rounded-xl p-6"
          >
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block py-3 text-foreground/80 hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  if (item.href === '#') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.name}
              </a>
            ))}
            <Button 
              className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
            >
              ابدأ الآن
            </Button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
