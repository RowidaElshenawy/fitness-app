import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

type ErrorAlertProps = {
  errorMessage?: string;
};

export default function ErrorAlert({ errorMessage = 'Something went wrong' }: ErrorAlertProps) {
  return (
    <Alert
      role="alert"
      className="mt-2 flex! h-auto min-h-10 w-full grid-cols-none! items-start gap-2 rounded-lg border-border-danger px-3 py-2 text-text-danger"
    >
      <AlertCircleIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <AlertDescription className="col-auto! min-w-0 flex-1 p-0 text-start text-xs leading-snug text-text-danger">
        {errorMessage}
      </AlertDescription>
    </Alert>
  );
}
