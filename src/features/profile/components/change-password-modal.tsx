import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/components/ui/button';
import CustomInput from '@/shared/components/custom-ui/custom-input';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { getChangePasswordSchema } from '../lib/schemas/change-password.schema';
import type { ChangePasswordField } from '../lib/types/change-password';
import { useChangePassword } from '../hooks/use-change-password';

type TChangePasswordModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ChangePasswordModal = ({ open, onOpenChange }: TChangePasswordModalProps) => {
  // Translation
  const { t } = useTranslation();

  // Mutation
  const { mutate: changePasswordMutation, isPending } = useChangePassword();

  // Form
  const form = useForm<ChangePasswordField>({
    resolver: zodResolver(getChangePasswordSchema(t)),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Functions
  const onSubmit = (data: ChangePasswordField) => {
    changePasswordMutation({
      password: data.password,
      newPassword: data.newPassword,
    });
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      form.reset();
    }

    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-lg bg-white" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t('profile.change-password.title')}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <CustomInput
            variant="password"
            subVariant="password"
            {...form.register('password')}
            error={!!form.formState.errors.password}
            errorMessage={form.formState.errors.password?.message}
          />

          <CustomInput
            variant="password"
            subVariant="password"
            {...form.register('newPassword')}
            error={!!form.formState.errors.newPassword}
            errorMessage={form.formState.errors.newPassword?.message}
          />

          <CustomInput
            variant="password"
            subVariant="password"
            {...form.register('confirmPassword')}
            error={!!form.formState.errors.confirmPassword}
            errorMessage={form.formState.errors.confirmPassword?.message}
          />

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
              className="cursor-pointer"
            >
              {t('profile.change-password.cancel')}
            </Button>

            <Button type="submit" disabled={isPending} className="cursor-pointer">
              {isPending
                ? t('profile.change-password.changing')
                : t('profile.change-password.change')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
