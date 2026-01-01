import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Languages, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language, toggleLanguage, t } = useLanguage();
  const { playSound, isSoundEnabled, toggleSound } = useSound();

  const navLinks = [
    { href: '#home', labelKey: 'nav.home' },
    { href: '#projects', labelKey: 'nav.projects' },
    { href: '#skills', labelKey: 'nav.skills' },
    { href: '#services', labelKey: 'nav.services' },
    { href: '#about', labelKey: 'nav.about' },
    { href: '#contact', labelKey: 'nav.contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleTheme = () => {
    playSound('toggle');
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  const handleLanguageToggle = () => {
    playSound('toggle');
    toggleLanguage();
  };

  const handleSoundToggle = () => {
    toggleSound();
    // Play sound after toggle if enabling
    if (!isSoundEnabled) {
      setTimeout(() => playSound('toggle'), 50);
    }
  };

  const handleLinkClick = () => {
    playSound('click');
    setIsMobileMenuOpen(false);
  };

  const handleLinkHover = () => {
    playSound('hover');
  };

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
      rootMargin: '-100px 0px -100px 0px',
    });

    navLinks.forEach(({ href }) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 pointer-events-auto ${isScrolled ? 'glass shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            className="text-xl md:text-2xl font-bold gradient-text"
            onClick={() => playSound('click')}
            onMouseEnter={handleLinkHover}
          >
            {language === 'ar' ? 'محمد سعيد' : 'Mohamed Saeed'}
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, labelKey }) => (
              <a
                key={href}
                href={href}
                onClick={() => playSound('click')}
                onMouseEnter={handleLinkHover}
                className={`nav-link font-medium ${activeSection === href.slice(1) ? 'text-primary active' : ''
                  }`}
              >
                {t(labelKey)}
              </a>
            ))}
          </div>

          {/* Theme Toggle, Language Toggle, Sound Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              onMouseEnter={handleLinkHover}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle sound"
            >
              {isSoundEnabled ? (
                <Volume2 className="w-4 h-4 text-primary" />
              ) : (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={handleLanguageToggle}
              onMouseEnter={handleLinkHover}
              className="flex items-center gap-1.5 px-2 py-1.5 md:px-3 md:py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            <button
              onClick={toggleTheme}
              onMouseEnter={handleLinkHover}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5 text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => {
                playSound('click');
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              onMouseEnter={handleLinkHover}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors relative z-50 pointer-events-auto"
              aria-label="Toggle menu"
              type="button"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-x-0 top-16 md:hidden bg-background/95 backdrop-blur-3xl border-b border-border/40 shadow-xl z-40 max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="flex flex-col p-4 gap-2">
                {navLinks.map(({ href, labelKey }, index) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick();
                        const target = document.querySelector(href);
                        if (target) {
                          setTimeout(() => {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }, 100);
                        }
                      }}
                      onMouseEnter={handleLinkHover}
                      className={`block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-200 ${activeSection === href.slice(1)
                          ? 'bg-primary/10 text-primary translate-x-1'
                          : 'hover:bg-muted hover:translate-x-1 text-muted-foreground hover:text-foreground'
                        }`}
                    >
                      {t(labelKey)}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
