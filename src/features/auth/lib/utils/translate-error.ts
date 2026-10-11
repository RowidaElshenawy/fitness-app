import type { TFunction } from 'i18next';

export const translateError =
  (t: TFunction) =>
  (message?: string): string | undefined =>
    message ? t(message) : undefined;
