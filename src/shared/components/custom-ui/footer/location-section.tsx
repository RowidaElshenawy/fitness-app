import React from 'react';
import { useTranslation } from 'react-i18next';

const LocationComponent: React.FC = () => {
  const { t } = useTranslation('footer');
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-bold uppercase text-text-plain">{t('our-locations')}</h3>

      <address className="max-w-64 leading-8 not-italic text-text-plain">{t('location')}</address>
    </div>
  );
};

export default LocationComponent;
