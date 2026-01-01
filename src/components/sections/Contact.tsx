import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, CheckCircle, Loader2, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfo } from '@/lib/data';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';
import emailjs from '@emailjs/browser';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type ContactFormData = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingData, setPendingData] = useState<ContactFormData | null>(null);
  const { t, language, isRTL } = useLanguage();
  const { playSound } = useSound();

  const contactSchema = z.object({
    name: z.string().min(2, language === 'ar' ? 'الاسم يجب أن يكون حرفين على الأقل' : 'Name must be at least 2 characters').max(100),
    email: z.string().email(language === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Invalid email address').max(255),
    projectType: z.string().min(1, language === 'ar' ? 'يرجى اختيار نوع المشروع' : 'Please select a project type'),
    message: z.string().min(10, language === 'ar' ? 'الرسالة يجب أن تكون 10 أحرف على الأقل' : 'Message must be at least 10 characters').max(1000),
  });

  const projectTypes = [
    { value: 'web', labelKey: 'contact.form.type.web' },
    { value: 'mobile', labelKey: 'contact.form.type.mobile' },
    { value: 'saas', labelKey: 'contact.form.type.saas' },
    { value: 'other', labelKey: 'contact.form.type.other' },
  ];

  const emailAddresses = [
    { email: 'contact@saeeddev.com', labelKey: 'contact.email.general' },
    { email: 'info@saeeddev.com', labelKey: 'contact.email.inquiries' },
    { email: 'projects@saeeddev.com', labelKey: 'contact.email.projects' },
    { email: 'support@saeeddev.com', labelKey: 'contact.email.support' },
  ];

  const contactInfo = [
    { icon: <MapPin className="w-5 h-5" />, labelKey: 'contact.info.location', value: language === 'ar' ? personalInfo.location : 'Alexandria, Egypt' },
    { icon: <CheckCircle className="w-5 h-5" />, labelKey: 'contact.info.available', value: t('contact.info.available') },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    playSound('click');
    setPendingData(data);
    setShowConfirmDialog(true);
  };

  const handleConfirmSend = async () => {
    if (!pendingData) return;
    
    setShowConfirmDialog(false);
    setIsSubmitting(true);
    
    try {
      await emailjs.send(
        'service_nozetsh',
        'template_g1txmks',
        {
          from_name: pendingData.name,
          from_email: pendingData.email,
          project_type: pendingData.projectType,
          message: pendingData.message,
        },
        'Opsp8EwVCiuU5ZgX7'
      );
      
      toast.success(t('contact.form.success'));
      playSound('success');
      setIsSubmitted(true);
      reset();
      setPendingData(null);
      
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      toast.error(language === 'ar' ? 'حدث خطأ أثناء الإرسال، حاول مرة أخرى' : 'Failed to send message, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProjectTypeLabel = (value: string) => {
    const type = projectTypes.find(t => t.value === value);
    return type ? t(type.labelKey) : value;
  };

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {t('contact.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('contact.title')} <span className="gradient-text">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-4"
          >
            {/* Email Addresses Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-5 border border-border card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-semibold">{t('contact.emails.title')}</h3>
              </div>
              <div className="space-y-3">
                {emailAddresses.map((item, index) => (
                  <motion.a
                    key={item.email}
                    href={`mailto:${item.email}`}
                    initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group"
                  >
                    <span className="text-sm text-muted-foreground">{t(item.labelKey)}</span>
                    <span dir="ltr" className="text-sm font-medium text-primary group-hover:underline">{item.email}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Other Contact Info */}
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 1) * 0.1 }}
                className="bg-card rounded-xl p-5 border border-border card-hover"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{t(info.labelKey)}</div>
                    <div className="font-medium">{info.value}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">{t('contact.form.name')}</label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder={language === 'ar' ? 'اكتب اسمك' : 'Enter your name'}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">{t('contact.form.email')}</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="example@email.com"
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-left"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Project Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">{t('contact.form.type')}</label>
                <select
                  {...register('projectType')}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">{language === 'ar' ? 'اختر نوع المشروع' : 'Select project type'}</option>
                  {projectTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {t(type.labelKey)}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="text-destructive text-sm mt-1">{errors.projectType.message}</p>
                )}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">{t('contact.form.message')}</label>
                <textarea
                  {...register('message')}
                  rows={5}
                  placeholder={language === 'ar' ? 'اكتب تفاصيل مشروعك...' : 'Describe your project details...'}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => playSound('hover')}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t('contact.form.sending')}
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {language === 'ar' ? 'تم الإرسال بنجاح!' : 'Sent Successfully!'}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('contact.form.submit')}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent className={isRTL ? 'rtl' : 'ltr'}>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                {language === 'ar' ? 'مراجعة البيانات قبل الإرسال' : 'Review Before Sending'}
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-4 mt-4">
                  <div className="bg-muted rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-muted-foreground text-sm">{t('contact.form.name')}:</span>
                      <span className="font-medium text-foreground">{pendingData?.name}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-muted-foreground text-sm">{t('contact.form.email')}:</span>
                      <span dir="ltr" className="font-medium text-foreground">{pendingData?.email}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-muted-foreground text-sm">{t('contact.form.type')}:</span>
                      <span className="font-medium text-foreground">{pendingData ? getProjectTypeLabel(pendingData.projectType) : ''}</span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <span className="text-muted-foreground text-sm block mb-2">{t('contact.form.message')}:</span>
                      <p className="text-foreground text-sm bg-background rounded p-3 max-h-32 overflow-y-auto">
                        {pendingData?.message}
                      </p>
                    </div>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className={isRTL ? 'flex-row-reverse gap-2' : ''}>
              <AlertDialogCancel>
                {language === 'ar' ? 'تعديل' : 'Edit'}
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmSend} className="bg-primary hover:bg-primary/90">
                <Send className="w-4 h-4 me-2" />
                {language === 'ar' ? 'تأكيد الإرسال' : 'Confirm Send'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};

export default Contact;
