import { Mail, MessageCircle, Linkedin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CONTACT = {
  email: 'exteban16@gmail.com',
  whatsappDisplay: '+52 33 1957 4885',
  whatsappHref: 'https://wa.me/523319574885',
  linkedin: 'https://www.linkedin.com/in/esteban-gonzalez08/',
} as const;

export default function Contact() {
  const { t } = useLanguage();

  const items = [
    {
      key: 'email',
      label: t('contact.emailLabel'),
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      icon: Mail,
      external: false,
    },
    {
      key: 'whatsapp',
      label: t('contact.whatsappLabel'),
      value: CONTACT.whatsappDisplay,
      href: CONTACT.whatsappHref,
      icon: MessageCircle,
      external: true,
    },
    {
      key: 'linkedin',
      label: t('contact.linkedinLabel'),
      value: 'linkedin.com/in/esteban-gonzalez08',
      href: CONTACT.linkedin,
      icon: Linkedin,
      external: true,
    },
  ] as const;

  return (
    <section
      id="contact"
      className="py-32 bg-stone-50 dark:bg-stone-900 px-4 md:px-8 border-t border-stone-200 dark:border-stone-700"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extralight text-stone-900 dark:text-stone-50 tracking-tight mb-6">
            {t('contact.title')}
          </h2>
          <div className="w-16 h-px bg-stone-300 dark:bg-stone-600 mx-auto mb-8" />
          <p className="text-xl text-stone-600 dark:text-stone-400 font-light tracking-wide max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {items.map(item => (
            <a
              key={item.key}
              href={item.href}
              {...(item.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="group flex flex-col items-center text-center p-8 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 hover:shadow-md dark:hover:shadow-stone-900/50 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center mb-4 group-hover:bg-stone-200 dark:group-hover:bg-stone-600 transition-colors duration-200">
                <item.icon className="w-5 h-5 text-stone-700 dark:text-stone-300" />
              </div>
              <span className="text-xs font-light tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-2">
                {item.label}
              </span>
              <span className="text-sm text-stone-900 dark:text-stone-100 font-light break-all">
                {item.value}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
