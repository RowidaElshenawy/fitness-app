import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CONTACTS = [
  { icon: Phone, label: '+91 123 456 789', href: 'tel:+911234567890' },
  { icon: Mail, label: 'info@gmail.com', href: 'mailto:info@gmail.com' },
];

const ContactComponent: React.FC = () => {
  const { t } = useTranslation('footer');
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-bold uppercase text-text-plain">{t('contact-us')}</h3>

      <ul className="flex flex-col gap-2">
        {CONTACTS.map(({ icon: Icon, label, href }) => (
          <li key={label}>
            <a href={href} className="flex items-center gap-4 text-text-plain">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border-plain">
                <Icon className="size-4" aria-hidden />
              </span>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactComponent;
