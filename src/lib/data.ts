import { Project, Skill, Service, PersonalInfo } from '@/types';
import novelsAppImage from '@/assets/projects/novels-app.jpg';
import sheikhHerbsImage from '@/assets/projects/sheikh-herbs.jpg';
import valdorStoreImage from '@/assets/projects/valdor-store.jpg';
import brozPlatformImage from '@/assets/projects/broz-platform.jpg';
import portfolioImage from '@/assets/projects/portfolio.jpg';

export const personalInfo: PersonalInfo = {
  name: 'محمد سعيد',
  title: 'مهندس تطوير ويب وتطبيقات موبايل',
  description: 'مهندس برمجيات متخصص في بناء حلول رقمية متكاملة مع 10 سنوات خبرة في تطوير تطبيقات الويب والموبايل. خبير في بناء منصات SaaS، المتاجر الإلكترونية، والتطبيقات التعليمية من الصفر حتى الإطلاق.',
  yearsOfExperience: 10,
  location: 'الإسكندرية، مصر',
  phone: '+201063887871',
  email: 'contact@mohamedsaeed.dev',
};

export const projects: Project[] = [
  {
    id: 'novels-app',
    title: 'تطبيق قراءة الروايات',
    description: 'تطبيق موبايل متكامل لقراءة الروايات مع نظام إدارة محتوى شامل وbackend قوي. يتضمن ميزات القراءة الليلية، حفظ التقدم، والإشعارات.',
    technologies: ['Flutter', 'Laravel API', 'PostgreSQL', 'Push Notifications', 'REST API'],
    type: 'mobile',
    image: novelsAppImage,
  },
  {
    id: 'sheikh-herbs',
    title: 'متجر شيخ العشابين الإلكتروني',
    description: 'متجر إلكتروني متكامل لبيع المنتجات العشبية والطبيعية مع لوحة تحكم شاملة لإدارة المنتجات والطلبات والعملاء.',
    technologies: ['Laravel', 'MySQL', 'Bootstrap', 'Payment Gateway', 'Admin Dashboard'],
    type: 'ecommerce',
    image: sheikhHerbsImage,
    liveUrl: 'https://sheikel3ashabeen.com/home',
  },
  {
    id: 'valdor-store',
    title: 'متجر فالدور الإلكتروني',
    description: 'منصة تجارة إلكترونية احترافية مع نظام إدارة متقدم، معالجة دفع آمنة، وتتبع الشحنات.',
    technologies: ['Laravel', 'MySQL', 'Vue.js', 'Shipping APIs', 'Admin Panel'],
    type: 'ecommerce',
    image: valdorStoreImage,
    liveUrl: 'https://valdor.me/home',
  },
  {
    id: 'broz-platform',
    title: 'منصة بروز التعليمية',
    description: 'منصة تعليمية متكاملة لحجز وإدارة الكورسات التدريبية مع نظام دفع إلكتروني ولوحة تحكم للمدربين والطلاب.',
    technologies: ['Next.js', 'Laravel API', 'PostgreSQL', 'Stripe', 'Authentication'],
    type: 'educational',
    image: brozPlatformImage,
  },
  {
    id: 'portfolio',
    title: 'بورتفوليو شخصي',
    description: 'موقع بورتفوليو احترافي لعرض المشاريع والخبرات مع تصميم عصري وتجربة مستخدم سلسة.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    type: 'portfolio',
    image: portfolioImage,
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: 'Next.js', level: 95, category: 'frontend' },
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'Tailwind CSS', level: 95, category: 'frontend' },
  { name: 'Vue.js', level: 75, category: 'frontend' },
  { name: 'HTML5/CSS3', level: 98, category: 'frontend' },
  { name: 'Framer Motion', level: 85, category: 'frontend' },

  // Backend
  { name: 'Laravel', level: 95, category: 'backend' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Express.js', level: 80, category: 'backend' },
  { name: 'PHP', level: 90, category: 'backend' },
  { name: 'RESTful APIs', level: 95, category: 'backend' },
  { name: 'GraphQL', level: 70, category: 'backend' },

  // Mobile
  { name: 'Flutter', level: 95, category: 'mobile' },
  { name: 'Dart', level: 90, category: 'mobile' },
  { name: 'Android', level: 85, category: 'mobile' },
  { name: 'iOS', level: 85, category: 'mobile' },
  { name: 'React Native', level: 75, category: 'mobile' },

  // Database & Tools
  { name: 'PostgreSQL', level: 90, category: 'database' },
  { name: 'MySQL', level: 92, category: 'database' },
  { name: 'MongoDB', level: 80, category: 'database' },
  { name: 'Git & GitHub', level: 95, category: 'database' },
  { name: 'Docker', level: 75, category: 'database' },
  { name: 'AWS/DigitalOcean', level: 85, category: 'database' },
];

export const services: Service[] = [
  {
    id: 'web-development',
    title: 'تطوير تطبيقات الويب',
    description: 'بناء مواقع ومنصات ويب احترافية باستخدام أحدث التقنيات',
    icon: 'Monitor',
    features: ['تصميم responsive', 'SEO optimization', 'Performance-focused', 'Scalable architecture'],
  },
  {
    id: 'mobile-development',
    title: 'تطوير تطبيقات الموبايل',
    description: 'تطوير تطبيقات Android و iOS احترافية باستخدام Flutter وReact Native',
    icon: 'Smartphone',
    features: ['Native performance', 'Cross-platform', 'Modern UI/UX', 'App Store deployment'],
  },
  {
    id: 'saas-platforms',
    title: 'بناء منصات SaaS',
    description: 'تصميم وتطوير منصات SaaS متكاملة من الصفر مع backend قوي',
    icon: 'Cloud',
    features: ['Subscription management', 'Payment integration', 'Admin dashboards', 'API development'],
  },
];

export const timeline = [
  { year: '2016-2018', title: 'بداية رحلة البرمجة وتطوير المواقع' },
  { year: '2018-2020', title: 'التخصص في Laravel وبناء المتاجر الإلكترونية' },
  { year: '2020-2022', title: 'دخول عالم تطوير تطبيقات الموبايل مع Flutter' },
  { year: '2022-الآن', title: 'بناء منصات SaaS ومشاريع full-stack متكاملة' },
];

export const navLinks = [
  { href: '#home', label: 'الرئيسية' },
  { href: '#projects', label: 'المشاريع' },
  { href: '#skills', label: 'المهارات' },
  { href: '#services', label: 'الخدمات' },
  { href: '#about', label: 'من أنا' },
  { href: '#contact', label: 'تواصل معي' },
];
