import SecHeader from '../sec-header';

export default function WhyUs() {
  return (
    <main className=" bg-bg-white-faint  flex  flex-col md:flex-row px-4 md:py-10 md:px-20 ">
      <div className="sec-content flex flex-col">
        <SecHeader title="Why Us" />
      </div>
      <div className="sec-photoes"></div>
    </main>
  );
}
