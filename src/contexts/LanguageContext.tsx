import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.projects': 'المشاريع',
    'nav.skills': 'المهارات',
    'nav.services': 'الخدمات',
    'nav.about': 'من أنا',
    'nav.contact': 'تواصل معي',

    // Hero
    'hero.greeting': '👋 مرحباً، أنا',
    'hero.title1': 'مطور Full-Stack',
    'hero.title2': 'مهندس تطبيقات موبايل',
    'hero.title3': 'بانٍ منصات SaaS',
    'hero.cta.projects': 'عرض المشاريع',
    'hero.cta.contact': 'تواصل معي',
    'hero.stat.years': 'سنوات خبرة',
    'hero.stat.projects': 'مشاريع ناجحة',
    'hero.stat.specialties': 'تخصصات رئيسية',
    'hero.scroll': 'اكتشف المزيد',

    // Projects
    'projects.badge': 'أعمالي',
    'projects.title': 'مشاريع',
    'projects.titleHighlight': 'مميزة',
    'projects.description': 'مجموعة من المشاريع التي عملت عليها في مجالات مختلفة',
    'projects.filter.all': 'الكل',
    'projects.filter.ecommerce': 'متاجر إلكترونية',
    'projects.filter.mobile': 'تطبيقات موبايل',
    'projects.filter.educational': 'منصات تعليمية',
    'projects.filter.portfolio': 'بورتفوليو',

    // Skills
    'skills.badge': 'مهاراتي',
    'skills.title': 'التقنيات التي',
    'skills.titleHighlight': 'أتقنها',
    'skills.description': 'مجموعة متنوعة من التقنيات والأدوات التي أستخدمها في بناء حلول رقمية متكاملة',
    'skills.frontend': 'تطوير الواجهات',
    'skills.backend': 'تطوير الباك إند',
    'skills.mobile': 'تطوير الموبايل',
    'skills.database': 'قواعد البيانات والأدوات',

    // Services
    'services.badge': 'خدماتي',
    'services.title': 'كيف يمكنني',
    'services.titleHighlight': 'مساعدتك؟',
    'services.description': 'أقدم مجموعة متنوعة من الخدمات لمساعدتك في تحويل أفكارك إلى واقع رقمي',
    'services.web.title': 'تطوير تطبيقات الويب',
    'services.web.description': 'بناء مواقع ومنصات ويب احترافية باستخدام أحدث التقنيات',
    'services.mobile.title': 'تطوير تطبيقات الموبايل',
    'services.mobile.description': 'تطوير تطبيقات Android و iOS احترافية باستخدام Flutter وReact Native',
    'services.saas.title': 'بناء منصات SaaS',
    'services.saas.description': 'تصميم وتطوير منصات SaaS متكاملة من الصفر مع backend قوي',

    // About
    'about.badge': 'من أنا؟',
    'about.title': 'تعرف على',
    'about.titleHighlight': 'قصتي',
    'about.bio1': 'مهندس برمجيات مصري متخصص في تطوير الحلول الرقمية المتكاملة. بدأت رحلتي في البرمجة منذ أكثر من 10 سنوات، وعملت على تطوير العشرات من المشاريع الناجحة في مجالات التجارة الإلكترونية، المنصات التعليمية، وتطبيقات الموبايل.',
    'about.bio2': 'أتميز بالقدرة على تحويل الأفكار إلى منتجات رقمية كاملة، من التخطيط والتصميم إلى التطوير والإطلاق. خبرتي تشمل العمل على مشاريع متنوعة من المتاجر الإلكترونية إلى المنصات التعليمية وتطبيقات الموبايل المعقدة.',
    'about.bio3': 'أؤمن بأهمية كتابة كود نظيف، قابل للتطوير، ويتبع أفضل الممارسات. شغفي هو بناء منتجات رقمية تحل مشاكل حقيقية وتقدم قيمة فعلية للمستخدمين.',
    'about.expertise': 'مجالات التخصص',
    'about.journey': 'رحلتي المهنية',

    // Contact
    'contact.badge': 'تواصل معي',
    'contact.title': 'هل لديك',
    'contact.titleHighlight': 'مشروع؟',
    'contact.description': 'دعنا نتحدث ونحول فكرتك إلى واقع رقمي',
    'contact.form.name': 'الاسم',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.type': 'نوع المشروع',
    'contact.form.type.web': 'تطوير ويب',
    'contact.form.type.mobile': 'تطبيق موبايل',
    'contact.form.type.saas': 'منصة SaaS',
    'contact.form.type.other': 'أخرى',
    'contact.form.message': 'الرسالة',
    'contact.form.submit': 'إرسال الرسالة',
    'contact.form.sending': 'جاري الإرسال...',
    'contact.form.success': 'تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.',
    'contact.info.email': 'البريد الإلكتروني',
    'contact.info.location': 'الموقع',
    'contact.info.available': 'متاح للمشاريع الجديدة',
    'contact.email.general': 'للتواصل العام',
    'contact.email.friendly': 'بديل ودود',
    'contact.email.inquiries': 'للاستفسارات',
    'contact.email.projects': 'لطلبات المشاريع',
    'contact.email.support': 'للدعم الفني',
    'contact.emails.title': 'عناوين البريد الإلكتروني',

    // Footer
    'footer.rights': 'جميع الحقوق محفوظة',

    // 404 Page
    'notFound.title': 'الصفحة غير موجودة',
    'notFound.description': 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    'notFound.backHome': 'العودة للرئيسية',
    'notFound.contact': 'تواصل معي',
    'notFound.suggestedLinks': 'روابط مقترحة:',

    // Testimonials
    'testimonials.badge': 'آراء العملاء',
    'testimonials.title': 'شوف الناس',
    'testimonials.titleHighlight': 'بتقول إيه؟',
    'testimonials.description': 'دي آراء بعض العملاء اللي اشتغلت معاهم وعملنا مشاريع حلوة سوا',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    // Hero
    'hero.greeting': "👋 Hello, I'm",
    'hero.title1': 'Full-Stack Developer',
    'hero.title2': 'Mobile Apps Engineer',
    'hero.title3': 'SaaS Builder',
    'hero.cta.projects': 'View Projects',
    'hero.cta.contact': 'Contact Me',
    'hero.stat.years': 'Years Experience',
    'hero.stat.projects': 'Successful Projects',
    'hero.stat.specialties': 'Main Specialties',
    'hero.scroll': 'Discover More',

    // Projects
    'projects.badge': 'My Work',
    'projects.title': 'Featured',
    'projects.titleHighlight': 'Projects',
    'projects.description': 'A collection of projects I have worked on in various fields',
    'projects.filter.all': 'All',
    'projects.filter.ecommerce': 'E-commerce',
    'projects.filter.mobile': 'Mobile Apps',
    'projects.filter.educational': 'Educational',
    'projects.filter.portfolio': 'Portfolio',

    // Skills
    'skills.badge': 'My Skills',
    'skills.title': 'Technologies I',
    'skills.titleHighlight': 'Master',
    'skills.description': 'A diverse set of technologies and tools I use to build comprehensive digital solutions',
    'skills.frontend': 'Frontend Development',
    'skills.backend': 'Backend Development',
    'skills.mobile': 'Mobile Development',
    'skills.database': 'Database & Tools',

    // Services
    'services.badge': 'My Services',
    'services.title': 'How Can I',
    'services.titleHighlight': 'Help You?',
    'services.description': 'I offer a variety of services to help you transform your ideas into digital reality',
    'services.web.title': 'Web Development',
    'services.web.description': 'Building professional websites and platforms using the latest technologies',
    'services.mobile.title': 'Mobile Development',
    'services.mobile.description': 'Developing professional Android & iOS apps using Flutter and React Native',
    'services.saas.title': 'SaaS Platforms',
    'services.saas.description': 'Designing and developing complete SaaS platforms from scratch with powerful backend',

    // About
    'about.badge': 'About Me',
    'about.title': 'Learn About',
    'about.titleHighlight': 'My Story',
    'about.bio1': 'Egyptian software engineer specializing in developing comprehensive digital solutions. I started my programming journey over 10 years ago, working on dozens of successful projects in e-commerce, educational platforms, and mobile applications.',
    'about.bio2': 'I excel at transforming ideas into complete digital products, from planning and design to development and launch. My experience includes working on diverse projects from e-commerce stores to educational platforms and complex mobile applications.',
    'about.bio3': 'I believe in the importance of writing clean, scalable code that follows best practices. My passion is building digital products that solve real problems and provide real value to users.',
    'about.expertise': 'Areas of Expertise',
    'about.journey': 'My Journey',

    // Contact
    'contact.badge': 'Contact Me',
    'contact.title': 'Have a',
    'contact.titleHighlight': 'Project?',
    'contact.description': "Let's talk and turn your idea into digital reality",
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.type': 'Project Type',
    'contact.form.type.web': 'Web Development',
    'contact.form.type.mobile': 'Mobile App',
    'contact.form.type.saas': 'SaaS Platform',
    'contact.form.type.other': 'Other',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Your message has been sent successfully! I will contact you soon.',
    'contact.info.email': 'Email',
    'contact.info.location': 'Location',
    'contact.info.available': 'Available for new projects',
    'contact.email.general': 'General Contact',
    'contact.email.friendly': 'Friendly Alternative',
    'contact.email.inquiries': 'Inquiries',
    'contact.email.projects': 'Project Requests',
    'contact.email.support': 'Technical Support',
    'contact.emails.title': 'Email Addresses',

    // Footer
    'footer.rights': 'All rights reserved',

    // 404 Page
    'notFound.title': 'Page Not Found',
    'notFound.description': 'Sorry, the page you are looking for does not exist or has been moved.',
    'notFound.backHome': 'Back to Home',
    'notFound.contact': 'Contact Me',
    'notFound.suggestedLinks': 'Suggested links:',

    // Testimonials
    'testimonials.badge': 'Testimonials',
    'testimonials.title': 'What People',
    'testimonials.titleHighlight': 'Are Saying?',
    'testimonials.description': "Here's what some awesome clients I've worked with have to say about our projects together",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
