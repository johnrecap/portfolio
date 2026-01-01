import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { skills } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiVuedotjs,
  SiLaravel, SiNodedotjs, SiExpress, SiPhp, SiGraphql,
  SiFlutter, SiDart, SiAndroid, SiApple,
  SiPostgresql, SiMysql, SiMongodb, SiGit, SiDocker, SiAmazon
} from 'react-icons/si';
import { TbApi, TbBrandReactNative } from 'react-icons/tb';

const skillIcons: Record<string, React.ReactNode> = {
  'Next.js': <SiNextdotjs className="w-6 h-6" />,
  'React': <SiReact className="w-6 h-6 text-cyan-500" />,
  'TypeScript': <SiTypescript className="w-6 h-6 text-blue-600" />,
  'Tailwind CSS': <SiTailwindcss className="w-6 h-6 text-cyan-400" />,
  'Vue.js': <SiVuedotjs className="w-6 h-6 text-green-500" />,
  'HTML5/CSS3': <span className="text-lg">🌐</span>,
  'Framer Motion': <span className="text-lg">🎬</span>,
  'Laravel': <SiLaravel className="w-6 h-6 text-red-500" />,
  'Node.js': <SiNodedotjs className="w-6 h-6 text-green-600" />,
  'Express.js': <SiExpress className="w-6 h-6" />,
  'PHP': <SiPhp className="w-6 h-6 text-purple-500" />,
  'RESTful APIs': <TbApi className="w-6 h-6 text-green-500" />,
  'GraphQL': <SiGraphql className="w-6 h-6 text-pink-500" />,
  'Flutter': <SiFlutter className="w-6 h-6 text-blue-400" />,
  'Dart': <SiDart className="w-6 h-6 text-blue-500" />,
  'Android': <SiAndroid className="w-6 h-6 text-green-500" />,
  'iOS': <SiApple className="w-6 h-6" />,
  'React Native': <TbBrandReactNative className="w-6 h-6 text-cyan-500" />,
  'PostgreSQL': <SiPostgresql className="w-6 h-6 text-blue-600" />,
  'MySQL': <SiMysql className="w-6 h-6 text-orange-500" />,
  'MongoDB': <SiMongodb className="w-6 h-6 text-green-500" />,
  'Git & GitHub': <SiGit className="w-6 h-6 text-orange-600" />,
  'Docker': <SiDocker className="w-6 h-6 text-blue-500" />,
  'AWS/DigitalOcean': <SiAmazon className="w-6 h-6 text-orange-400" />,
};

const categoryIcons: Record<string, string> = {
  frontend: '🎨',
  backend: '⚙️',
  mobile: '📱',
  database: '🗄️',
};

const Skills = () => {
  const categories = ['frontend', 'backend', 'mobile', 'database'] as const;
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  const categoryLabels: Record<string, string> = {
    frontend: t('skills.frontend'),
    backend: t('skills.backend'),
    mobile: t('skills.mobile'),
    database: t('skills.database'),
  };
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section ref={sectionRef} id="skills" className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" 
      />
      
      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {t('skills.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('skills.title')} <span className="gradient-text">{t('skills.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('skills.description')}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border card-hover"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{categoryIcons[category]}</span>
                <h3 className="text-xl font-bold">{categoryLabels[category]}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                            {skillIcons[skill.name] || <span>💻</span>}
                          </div>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="skill-progress">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.05 }}
                          className="skill-progress-bar"
                        />
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
