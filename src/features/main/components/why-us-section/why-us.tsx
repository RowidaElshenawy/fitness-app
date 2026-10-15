import SecHeader from '../../shared/sec-header';
import SecTitle from '../../shared/sec-title';
import BackgroundTitle from './background-title';
import FeatureList from './features-list';
import ImagesContainer from './images-container';

export default function WhyUs() {
  return (
    <main className="relative overflow-hidden bg-bg-white-faint gap-5 md:h-screen flex flex-col md:flex-row px-4 md:py-10 md:px-20">
      <BackgroundTitle text="Why us" className="absolute top-[45px] left-4 md:left-[75px]" />

      <div className="sec-content relative z-10 flex flex-col justify-start">
        <SecHeader titleKey="sec-header.why-us" className="pb-6" />
        <SecTitle translationKey="why-us.sec-title.why-us" />
        <p className="font-rubik pb-4 md:pb-16 text-[18px] leading-[28.8px] text-text-plain">
          We offer a fitness journey that's tailored to your goals, supported by professional
          trainers and a welcoming commitment. Whether it's weight loss, strength building, or
          overall wellness, our proven methods.
        </p>
        <FeatureList />
      </div>

      <ImagesContainer className="sec-images relative z-10" />
    </main>
  );
}
