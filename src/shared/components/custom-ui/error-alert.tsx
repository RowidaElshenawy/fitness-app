import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertAction, AlertDescription } from '../ui/alert';

type ErrorAlertProps = {
  errorMessage?: string;
  beError?: string;
  isRtl?: boolean;
};

export default function ErrorAlert({ errorMessage }: ErrorAlertProps) {
  return (
    <Alert className="w-full mt-1 border-border-danger text-text-danger h-10  radius-lg  relative flex items-center justify-start ">
      <AlertCircleIcon />
      <AlertDescription>{errorMessage}</AlertDescription>
      <AlertAction></AlertAction>
    </Alert>
  );
}
