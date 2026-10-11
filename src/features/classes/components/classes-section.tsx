import SecHeader from '@/features/main/shared/sec-header';
import SecTitle from '@/features/main/shared/sec-title';

export default function ClassesSection() {
  return (
    <main>
      <SecHeader titleKey="sec-header.fitness-classes" className="pb-6" />
      <SecTitle translationKey="why-us.sec-title.fitness-classes" />
    </main>
  );
}
