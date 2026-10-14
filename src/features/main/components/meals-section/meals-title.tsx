import SecHeader from '../../shared/sec-header';
import SecTitle from '../../shared/sec-title';

export default function Title() {
  return (
    <>
      <SecHeader titleKey="meals.badge" className="justify-center" />

      <SecTitle
        translationKey="meals.title"
        className="mx-auto mt-8 max-w-2xl text-center text-4xl leading-normal"
      />
    </>
  );
}
