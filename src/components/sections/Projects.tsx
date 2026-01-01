import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/lib/data';
import { Project } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

const techColors: Record<string, string> = {
  'Flutter': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'Laravel': 'bg-red-500/10 text-red-600 dark:text-red-400',
  'Laravel API': 'bg-red-500/10 text-red-600 dark:text-red-400',
  'Next.js': 'bg-foreground/10 text-foreground',
  'Vue.js': 'bg-green-500/10 text-green-600 dark:text-green-400',
  'PostgreSQL': 'bg-blue-600/10 text-blue-700 dark:text-blue-300',
  'MySQL': 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  'TypeScript': 'bg-blue-600/10 text-blue-700 dark:text-blue-300',
  'Tailwind CSS': 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  'Framer Motion': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  'Stripe': 'bg-purple-600/10 text-purple-700 dark:text-purple-300',
  'Bootstrap': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  'REST API': 'bg-green-500/10 text-green-600 dark:text-green-400',
};

const projectTitlesEn: Record<string, string> = {
  'novels-app': 'Novels Reading App',
  'sheikh-herbs': 'Sheikh Al-Ashabin Store',
  'valdor-store': 'Valdor E-commerce Store',
  'broz-platform': 'Broz Educational Platform',
  'portfolio': 'Personal Portfolio',
};

const projectDescriptionsEn: Record<string, string> = {
  'novels-app': 'A comprehensive mobile app for reading novels with a complete content management system and powerful backend. Includes night reading mode, progress saving, and notifications.',
  'sheikh-herbs': 'A complete e-commerce store for herbal and natural products with a comprehensive admin panel for managing products, orders, and customers.',
  'valdor-store': 'A professional e-commerce platform with an advanced management system, secure payment processing, and shipment tracking.',
  'broz-platform': 'A comprehensive educational platform for booking and managing training courses with an electronic payment system and admin panels for trainers and students.',
  'portfolio': 'A professional portfolio website showcasing projects and experiences with a modern design and smooth user experience.',
};

const ProjectCard = ({ project, index, language }: { project: Project; index: number; language: 'ar' | 'en' }) => {
  const title = language === 'ar' ? project.title : projectTitlesEn[project.id] || project.title;
  const description = language === 'ar' ? project.description : projectDescriptionsEn[project.id] || project.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative bg-card rounded-2xl overflow-hidden card-hover border border-border"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-foreground/20 backdrop-blur-sm">
          <button className="p-3 rounded-full bg-card/90 hover:bg-card transition-colors shadow-lg">
            <ExternalLink className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full bg-card/90 hover:bg-card transition-colors shadow-lg">
            <Github className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className={`px-2 py-1 rounded-md text-xs font-medium ${
                techColors[tech] || 'bg-muted text-muted-foreground'
              }`}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();

  const projectTypes = [
    { key: 'all', labelKey: 'projects.filter.all' },
    { key: 'ecommerce', labelKey: 'projects.filter.ecommerce' },
    { key: 'mobile', labelKey: 'projects.filter.mobile' },
    { key: 'educational', labelKey: 'projects.filter.educational' },
    { key: 'portfolio', labelKey: 'projects.filter.portfolio' },
  ];
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const filteredProjects = projects.filter(
    (project) => activeFilter === 'all' || project.type === activeFilter
  );

  return (
    <section ref={sectionRef} id="projects" className="section-padding relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-10" 
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
            {t('projects.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('projects.title')} <span className="gradient-text">{t('projects.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('projects.description')}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {projectTypes.map(({ key, labelKey }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeFilter === key
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
