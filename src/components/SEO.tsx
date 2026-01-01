import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const SEO = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    // Update HTML lang and dir attributes
    document.documentElement.lang = language === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Update title based on language
    document.title = language === 'ar' 
      ? 'محمد سعيد - مهندس تطوير ويب وتطبيقات موبايل'
      : 'Mohamed Saeed - Web & Mobile Application Engineer';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', language === 'ar'
        ? 'مهندس برمجيات متخصص في بناء حلول رقمية متكاملة مع 10 سنوات خبرة في Next.js, Laravel, Flutter'
        : 'Software engineer specialized in building integrated digital solutions with 10 years of experience in Next.js, Laravel, Flutter'
      );
    }
    
    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    
    if (ogTitle) {
      ogTitle.setAttribute('content', language === 'ar'
        ? 'محمد سعيد - مهندس تطوير ويب وتطبيقات موبايل'
        : 'Mohamed Saeed - Web & Mobile Application Engineer'
      );
    }
    
    if (ogDescription) {
      ogDescription.setAttribute('content', language === 'ar'
        ? 'مهندس برمجيات متخصص في بناء حلول رقمية متكاملة مع 10 سنوات خبرة'
        : 'Software engineer specialized in building integrated digital solutions with 10 years of experience'
      );
    }
    
    if (ogLocale) {
      ogLocale.setAttribute('content', language === 'ar' ? 'ar_EG' : 'en_US');
    }
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    
    if (twitterTitle) {
      twitterTitle.setAttribute('content', language === 'ar'
        ? 'محمد سعيد - مهندس تطوير ويب وتطبيقات موبايل'
        : 'Mohamed Saeed - Web & Mobile Application Engineer'
      );
    }
    
    if (twitterDescription) {
      twitterDescription.setAttribute('content', language === 'ar'
        ? 'مهندس برمجيات متخصص في بناء حلول رقمية متكاملة مع 10 سنوات خبرة'
        : 'Software engineer specialized in building integrated digital solutions with 10 years of experience'
      );
    }
  }, [language]);
  
  // JSON-LD Structured Data for Person
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": language === 'ar' ? "محمد سعيد" : "Mohamed Saeed",
    "jobTitle": language === 'ar' ? "مهندس تطوير ويب وتطبيقات موبايل" : "Web & Mobile Application Engineer",
    "description": language === 'ar' 
      ? "مهندس برمجيات متخصص في بناء حلول رقمية متكاملة مع 10 سنوات خبرة"
      : "Software engineer specialized in building integrated digital solutions with 10 years of experience",
    "url": "https://mohamed-saeed.dev",
    "email": "mohamed.saeed@example.com",
    "telephone": "+201234567890",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": language === 'ar' ? "الإسكندرية" : "Alexandria",
      "addressCountry": language === 'ar' ? "مصر" : "Egypt"
    },
    "sameAs": [
      "https://github.com/mohamedsaeed",
      "https://linkedin.com/in/mohamedsaeed",
      "https://twitter.com/mohamedsaeed"
    ],
    "knowsAbout": [
      "Next.js",
      "React",
      "Laravel",
      "Flutter",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Tailwind CSS"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": language === 'ar' ? "جامعة الإسكندرية" : "Alexandria University"
    },
    "worksFor": {
      "@type": "Organization",
      "name": language === 'ar' ? "مستقل" : "Freelancer"
    }
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default SEO;
