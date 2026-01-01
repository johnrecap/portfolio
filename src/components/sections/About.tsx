import { motion } from 'framer-motion';
import { MapPin, Calendar, Code2 } from 'lucide-react';
import { personalInfo, timeline } from '@/lib/data';
import profileImage from '@/assets/profile.jpeg';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t, language, isRTL } = useLanguage();

  const expertise = [
    'E-commerce Solutions',
    'Educational Platforms',
    'Mobile Applications',
    'Admin Dashboards',
    'API Development',
    'Payment Integration',
  ];

  const timelineEn = [
    { year: '2016-2018', title: 'Started programming journey and website development' },
    { year: '2018-2020', title: 'Specialized in Laravel and e-commerce development' },
    { year: '2020-2022', title: 'Entered mobile app development with Flutter' },
    { year: '2022-Present', title: 'Building SaaS platforms and full-stack projects' },
  ];

  const displayTimeline = language === 'ar' ? timeline : timelineEn;
  const name = language === 'ar' ? personalInfo.name : 'Mohamed Saeed';
  const location = language === 'ar' ? personalInfo.location : 'Alexandria, Egypt';

  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {t('about.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('about.title')} <span className="gradient-text">{t('about.titleHighlight')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={profileImage} 
                  alt={name}
                  className="w-16 h-16 rounded-full object-cover object-top"
                />
                <div>
                  <h3 className="text-xl font-bold">{name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4" />
                    {location}
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t('about.bio1')}</p>
                <p>{t('about.bio2')}</p>
                <p>{t('about.bio3')}</p>
              </div>
            </div>

            {/* Expertise */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-primary" />
                <h4 className="font-bold">{t('about.expertise')}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {expertise.map((item, index) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-6 lg:p-8 border border-border"
          >
            <div className="flex items-center gap-2 mb-8">
              <Calendar className="w-5 h-5 text-primary" />
              <h4 className="font-bold">{t('about.journey')}</h4>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className={`absolute top-0 bottom-0 ${isRTL ? 'right-3' : 'left-3'} w-0.5 bg-gradient-to-b from-primary via-secondary to-accent`} />

              {/* Timeline Items */}
              <div className="space-y-8">
                {displayTimeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative ${isRTL ? 'pr-10' : 'pl-10'}`}
                  >
                    {/* Dot */}
                    <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-1 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center`}>
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>

                    {/* Content */}
                    <div className="bg-muted/50 rounded-xl p-4 hover:bg-muted transition-colors">
                      <div className="text-sm font-semibold text-primary mb-1">
                        {item.year}
                      </div>
                      <div className="text-foreground font-medium">
                        {item.title}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
