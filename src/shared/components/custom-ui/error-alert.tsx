import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertAction, AlertDescription } from '../ui/alert';

type ErrorAlertProps = {
  errorMessage?: string;
  beError?: string;
  isRtl?: boolean;
};

export default function ErrorAlert({ errorMessage, beError }: ErrorAlertProps) {
  return (
    <Alert className="w-full mt-1   radius-lg  relative flex items-center justify-start ">
      <AlertCircleIcon className="!text-text-danger" />
      {errorMessage && <AlertDescription>{errorMessage}</AlertDescription>}
      {beError && <AlertDescription>{beError}</AlertDescription>}
      <AlertAction></AlertAction>
    </Alert>
  );
}
