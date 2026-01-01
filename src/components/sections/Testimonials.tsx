import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/contexts/SoundContext';

const testimonials = [
  {
    id: 1,
    nameAr: 'أحمد محمود',
    nameEn: 'Ahmed Mahmoud',
    roleAr: 'صاحب متجر إلكتروني',
    roleEn: 'E-commerce Store Owner',
    contentAr: 'والله الراجل ده جامد جداً! عملي متجر إلكتروني تحفة وسريع وشغال زي الساعة. كل اللي طلبته نفذهولي بالظبط وزيادة كمان. أنصح أي حد يتعامل معاه 💯',
    contentEn: "This guy is absolutely amazing! Built me an online store that's super fast and works like a charm. Did everything I asked for and then some. Highly recommend working with him! 💯",
    rating: 5,
    avatar: 'أم',
  },
  {
    id: 2,
    nameAr: 'سارة علي',
    nameEn: 'Sara Ali',
    roleAr: 'مديرة منصة تعليمية',
    roleEn: 'Educational Platform Manager',
    contentAr: 'اشتغلنا مع محمد على منصة تعليمية كبيرة والحقيقة فاق توقعاتنا. شغله نضيف ومنظم وبيفهم اللي انت عايزه من أول مرة. الدعم الفني بعد التسليم ممتاز برضو!',
    contentEn: "Worked with Mohamed on a huge educational platform and honestly he exceeded our expectations. His work is clean, organized, and he gets what you want from the get-go. Post-delivery support is top-notch too!",
    rating: 5,
    avatar: 'سع',
  },
  {
    id: 3,
    nameAr: 'خالد حسن',
    nameEn: 'Khaled Hassan',
    roleAr: 'رائد أعمال',
    roleEn: 'Entrepreneur',
    contentAr: 'عملي تطبيق موبايل للأندرويد والـ iOS في وقت قياسي. الجودة عالية والتصميم شيك جداً. التعامل معاه مريح وبيرد بسرعة على أي استفسار. شكراً يا محمد! 🙌',
    contentEn: "Built me a mobile app for both Android and iOS in record time. Quality is amazing and the design is super sleek. Working with him is smooth and he responds quickly to any questions. Thanks Mohamed! 🙌",
    rating: 5,
    avatar: 'خح',
  },
  {
    id: 4,
    nameAr: 'نورهان أحمد',
    nameEn: 'Nourhan Ahmed',
    roleAr: 'صاحبة بيزنس أونلاين',
    roleEn: 'Online Business Owner',
    contentAr: 'من أحسن المبرمجين اللي اتعاملت معاهم. فاهم السوق كويس ومش بس بينفذ، لأ ده بيقترح حاجات تفيد المشروع. لو محتاج حد تعتمد عليه، ده الشخص!',
    contentEn: "One of the best developers I've ever worked with. He understands the market well and doesn't just execute - he suggests things that benefit the project. If you need someone reliable, he's your guy!",
    rating: 5,
    avatar: 'نأ',
  },
  {
    id: 5,
    nameAr: 'محمود سمير',
    nameEn: 'Mahmoud Samir',
    roleAr: 'مدير شركة ناشئة',
    roleEn: 'Startup CEO',
    contentAr: 'بنينا معاه منصة SaaS كاملة من الصفر. الراجل بيشتغل بضمير وبيهتم بأدق التفاصيل. السعر مناسب جداً مقارنة بالجودة. هنشتغل معاه تاني أكيد!',
    contentEn: "We built a complete SaaS platform with him from scratch. The man works with dedication and pays attention to the smallest details. Price is super fair for the quality. Will definitely work with him again!",
    rating: 5,
    avatar: 'مس',
  },
];

const Testimonials = () => {
  const { t, isRTL, language } = useLanguage();
  const { playSound } = useSound();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    direction: isRTL ? 'rtl' : 'ltr',
    align: 'center',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      playSound('click');
    }
  }, [emblaApi, playSound]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      playSound('click');
    }
  }, [emblaApi, playSound]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Auto-scroll
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section id="testimonials" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('testimonials.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('testimonials.title')}{' '}
            <span className="text-primary">{t('testimonials.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.description')}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 px-4"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-2xl p-8 shadow-lg border border-border relative"
                  >
                    {/* Quote icon */}
                    <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-lg leading-relaxed mb-6 text-foreground/90">
                      {language === 'ar' ? testimonial.contentAr : testimonial.contentEn}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {language === 'ar' ? testimonial.nameAr : testimonial.nameEn}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {language === 'ar' ? testimonial.roleAr : testimonial.roleEn}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 rounded-full shadow-lg bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={scrollPrev}
          >
            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 rounded-full shadow-lg bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={scrollNext}
          >
            {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'bg-primary w-8'
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                onClick={() => {
                  emblaApi?.scrollTo(index);
                  playSound('click');
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
