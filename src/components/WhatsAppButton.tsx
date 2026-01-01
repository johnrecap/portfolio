import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '201063887871';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('مرحباً، أريد التواصل معك بخصوص مشروع.')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-btn"
      aria-label="تواصل عبر واتساب"
    >
      <span className="w-7 h-7 flex items-center justify-center">
        <FaWhatsapp size={28} />
      </span>
    </a>
  );
};

export default WhatsAppButton;
