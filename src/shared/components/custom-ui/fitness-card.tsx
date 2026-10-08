import { ArrowUpRight } from 'lucide-react';

interface FitnessCardProps {
  title: string;
  image: string;
  onExplore?: () => void;
}

export default function FitnessCard({ title, image, onExplore }: FitnessCardProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden cursor-pointer group h-96  border-2 border-white">
      <img
        src={
          image
            ? image
            : 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80'
        }
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div
        className="
      absolute
      bottom-0 left-0 right-0
      bg-black/45
      backdrop-blur-lg
      p-6
      flex flex-col gap-4
    "
      >
        <h3 className="text-white font-bold text-xl tracking-widest uppercase">{title}</h3>

        <button onClick={onExplore} className="flex items-center gap-2 w-fit">
          <span className="text-text-primary font-semibold text-base">Explore</span>

          <span className="w-7 h-7 rounded-full bg-bg-primary flex items-center justify-center">
            <ArrowUpRight size={16} color="white" strokeWidth={2.5} />
          </span>
        </button>
      </div>
    </div>
  );
}
