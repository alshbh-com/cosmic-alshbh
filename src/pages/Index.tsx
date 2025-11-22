import { useState } from 'react';
import SpaceBackground from '@/components/SpaceBackground';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import IntroScreen from '@/components/IntroScreen';
import WhatsAppButton from '@/components/WhatsAppButton';
import WhySection from '@/components/WhySection';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
      
      <div className="relative min-h-screen">
        <SpaceBackground />
        <Navigation />
        <WhatsAppButton />
        <main>
          <Hero />
          <About />
          <Services />
          <WhySection />
          <Portfolio />
          <Contact />
        </main>
      </div>
    </>
  );
};

export default Index;
