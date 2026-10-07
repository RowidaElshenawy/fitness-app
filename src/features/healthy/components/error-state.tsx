import { Button } from '@/shared/components/ui/button';
import { useTranslation } from 'react-i18next';

interface ErrorStateProps {
  onRetry: () => void;

  message?: string;
}

export default function ErrorState({ onRetry, message }: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-text-plain">
      <p>{message ?? t('main.healthy.error')}</p>
      <Button variant="outline" onClick={onRetry}>
        {t('main.healthy.retry')}
      </Button>
    </div>
  );
}
