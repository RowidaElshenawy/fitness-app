import SecHeader from '../../shared/sec-header';
import FeatureList from './features-list';

export default function WhyUs() {
  return (
    <main className=" bg-bg-white-faint  flex  flex-col md:flex-row px-4 md:py-10 md:px-20 ">
      <div className="sec-content flex flex-col">
        <SecHeader title="Why Us" className="pb-6" />
        <p className="font-rubik pb-4 md:pb-16 text-[18px] leading-[28.8px] text-text-plain">
          We offer a fitness journey that's tailored to your goals, supported by professional
          trainers and a welcoming community. Whether it's weight loss, strength building, or
          overall wellness, our proven methods.
        </p>
        <FeatureList />
      </div>
      <div className="sec-photoes"></div>
    </main>
  );
}
