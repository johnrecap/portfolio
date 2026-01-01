import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Send, Briefcase } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import profileImage from '@/assets/profile.jpeg';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language, isRTL } = useLanguage();
  const { playSound } = useSound();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const stats = [
    { value: '10+', labelKey: 'hero.stat.years' },
    { value: '5+', labelKey: 'hero.stat.projects' },
    { value: '3', labelKey: 'hero.stat.specialties' },
  ];

  const typeSequence = language === 'ar'
    ? [t('hero.title1'), 2000, t('hero.title2'), 2000, t('hero.title3'), 2000]
    : [t('hero.title1'), 2000, t('hero.title2'), 2000, t('hero.title3'), 2000];

  const description = language === 'ar'
    ? personalInfo.description
    : 'Software engineer specializing in building comprehensive digital solutions with 10 years of experience in web and mobile development. Expert in building SaaS platforms, e-commerce stores, and educational applications from scratch to launch.';

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background with Parallax */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 animate-gradient" />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-secondary/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute top-1/2 left-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-accent/15 rounded-full blur-3xl"
        />
      </div>

      <div className="section-container px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12 py-16 sm:py-20 lg:py-0">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-start"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium"
            >
              {t('hero.greeting')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6"
            >
              <span className="gradient-text">
                {language === 'ar' ? personalInfo.name : 'Mohamed Saeed'}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-4 sm:mb-6 h-12 sm:h-16"
            >
              <TypeAnimation
                key={language}
                sequence={typeSequence}
                repeat={Infinity}
                cursor={true}
                className="font-medium"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 lg:me-auto mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0"
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-12 px-2 sm:px-0"
            >
              <a
                href="#projects"
                className="btn-primary w-full sm:w-auto"
                onClick={() => playSound('click')}
                onMouseEnter={() => playSound('hover')}
              >
                <Briefcase className="w-5 h-5" />
                {t('hero.cta.projects')}
              </a>
              <a
                href="#contact"
                className="btn-outline w-full sm:w-auto"
                onClick={() => playSound('click')}
                onMouseEnter={() => playSound('hover')}
              >
                <Send className="w-5 h-5" />
                {t('hero.cta.contact')}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 md:gap-8 lg:gap-12"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                    {t(stat.labelKey)}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex-shrink-0 max-w-full"
          >
            <div className="relative overflow-visible lg:overflow-visible">
              {/* Gradient Ring */}
              <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-br from-primary via-secondary to-accent animate-spin-slow">
                <div className="w-full h-full rounded-full bg-background" />
              </div>

              {/* Avatar Container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden gradient-border p-1">
                <img
                  src={profileImage}
                  alt={language === 'ar' ? personalInfo.name : 'Mohamed Saeed'}
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-2 right-0 px-4 py-2 rounded-full glass-card text-sm font-medium shadow-lg flex items-center gap-2"
              >
                <span className="text-yellow-500">⚡</span> Next.js
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
                className="absolute bottom-8 -left-6 px-4 py-2 rounded-full glass-card text-sm font-medium shadow-lg flex items-center gap-2"
              >
                <span className="text-cyan-500">📱</span> Flutter
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2.8, delay: 1 }}
                className="absolute top-1/3 -left-10 px-4 py-2 rounded-full glass-card text-sm font-medium shadow-lg flex items-center gap-2"
              >
                <span className="text-red-500">🚀</span> Laravel
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.2, delay: 1.5 }}
                className="absolute top-16 -right-8 px-4 py-2 rounded-full glass-card text-sm font-medium shadow-lg flex items-center gap-2"
              >
                <span className="text-blue-500">⚛️</span> React
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 2 }}
                className="absolute -bottom-2 left-1/3 px-4 py-2 rounded-full glass-card text-sm font-medium shadow-lg flex items-center gap-2"
              >
                <span className="text-green-500">🎨</span> Tailwind
              </motion.div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 2.5 }}
                className="absolute top-2/3 -right-12 px-4 py-2 rounded-full glass-card text-sm font-medium shadow-lg flex items-center gap-2"
              >
                <span className="text-purple-500">🗄️</span> PostgreSQL
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#projects"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-sm">{t('hero.scroll')}</span>
            <ArrowDown className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
