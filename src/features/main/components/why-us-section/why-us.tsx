import SecHeader from '../../shared/sec-header';
import SecTitle from '../../shared/sec-title';
import BackgroundTitle from './background-title';
import FeatureList from './features-list';
import ImagesContainer from './images-container';
import { useTranslation } from 'react-i18next';

export default function WhyUs() {
  //Translation
  const { t } = useTranslation();

  return (
    <main className="relative overflow-hidden bg-bg-white-faint gap-5 md:h-screen flex flex-col md:flex-row px-4 md:py-10 md:px-20">
      <BackgroundTitle
        text={t('why-us.background-title')}
        className="absolute top-[45px] start-4 md:start-[75px]"
      />
      <div className="sec-content pt-8.5 relative z-10 flex flex-col justify-start">
        <SecHeader titleKey="sec-header.why-us" className="pb-6" />
        <SecTitle translationKey="why-us.sec-title.why-us" />
        <p className="font-rubik pb-4 md:pb-16 text-[18px] leading-[28.8px] text-text-plain">
          {t('why-us.paragraph')}
        </p>
        <FeatureList />
      </div>

      <ImagesContainer className="sec-images relative z-10" />
    </main>
  );
}
