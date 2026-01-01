import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-background text-foreground ${isRTL ? '' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <SEO />
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Services />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
