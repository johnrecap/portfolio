import { motion } from 'framer-motion';
import { Monitor, Smartphone, Cloud, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const serviceIcons: Record<string, React.ReactNode> = {
  'Monitor': <Monitor className="w-8 h-8" />,
  'Smartphone': <Smartphone className="w-8 h-8" />,
  'Cloud': <Cloud className="w-8 h-8" />,
};

const Services = () => {
  const { t, language } = useLanguage();

  const services = [
    {
      id: 'web-development',
      title: t('services.web.title'),
      description: t('services.web.description'),
      icon: 'Monitor',
      features: language === 'ar' 
        ? ['تصميم responsive', 'SEO optimization', 'Performance-focused', 'Scalable architecture']
        : ['Responsive Design', 'SEO Optimization', 'Performance-focused', 'Scalable Architecture'],
    },
    {
      id: 'mobile-development',
      title: t('services.mobile.title'),
      description: t('services.mobile.description'),
      icon: 'Smartphone',
      features: language === 'ar'
        ? ['Native performance', 'Cross-platform', 'Modern UI/UX', 'App Store deployment']
        : ['Native Performance', 'Cross-platform', 'Modern UI/UX', 'App Store Deployment'],
    },
    {
      id: 'saas-platforms',
      title: t('services.saas.title'),
      description: t('services.saas.description'),
      icon: 'Cloud',
      features: language === 'ar'
        ? ['Subscription management', 'Payment integration', 'Admin dashboards', 'API development']
        : ['Subscription Management', 'Payment Integration', 'Admin Dashboards', 'API Development'],
    },
  ];

  return (
    <section id="services" className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {t('services.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('services.title')} <span className="gradient-text">{t('services.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative bg-card rounded-2xl p-8 border border-border card-hover overflow-hidden"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {serviceIcons[service.icon]}
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
