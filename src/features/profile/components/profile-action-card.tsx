import type { LucideIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils/tailwind-cn';

type ProfileActionCardProps = {
  icon: LucideIcon;
  title: string;
  value?: string;
  onClick?: () => void;
};

const ProfileActionCard = ({ icon: Icon, title, value, onClick }: ProfileActionCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        'flex min-h-32 w-full flex-col items-center justify-center gap-2 rounded-lg border border-white p-3 text-center text-white sm:min-h-36 sm:p-4',
        onClick && 'cursor-pointer'
      )}
    >
      <Icon className="size-5 text-white sm:size-6" />

      <span className="text-sm font-medium sm:text-base">{title}</span>

      {value && <span className="text-xs sm:text-sm">{value}</span>}
    </button>
  );
};

export default ProfileActionCard;
