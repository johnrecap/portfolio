import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Twitter } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language, isRTL } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: '#home', labelKey: 'nav.home' },
    { href: '#projects', labelKey: 'nav.projects' },
    { href: '#skills', labelKey: 'nav.skills' },
    { href: '#contact', labelKey: 'nav.contact' },
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: '#', label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
  ];

  const name = language === 'ar' ? personalInfo.name : 'Mohamed Saeed';

  return (
    <footer className="relative bg-card border-t border-border">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}
          >
            <a href="#home" className="text-xl font-bold gradient-text">
              {name}
            </a>
            <p className="text-muted-foreground text-sm mt-2">
              © {new Date().getFullYear()} {t('footer.rights')}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {navLinks.map(({ href, labelKey }) => (
              <a
                key={href}
                href={href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t(labelKey)}
              </a>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`flex justify-center ${isRTL ? 'md:justify-start' : 'md:justify-end'} gap-4`}
          >
            {socialLinks.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {icon}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all"
        aria-label={language === 'ar' ? 'العودة للأعلى' : 'Back to top'}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;
