import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PasswordInput, Text, Title, useMantineTheme } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { useChangePassword } from "./change-password";
import { PasswordChangeFormData, passwordChangeSchema } from "@/shared/validation/profile-validation";

export function ChangePasswordForm({ onClose }: { onClose: () => void }) {
  const theme = useMantineTheme();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordChangeFormData>({
    mode: 'onBlur',
    resolver: zodResolver(passwordChangeSchema)
  });

  const { changePassword } = useChangePassword();

  const onSubmit: SubmitHandler<PasswordChangeFormData> = async (data) => {
    await changePassword(data.password, data.newPassword);
    onClose();
  };

  return(
    <>
      <Title size='24px' style={{marginBottom: '32px', textAlign: 'center'}}>Change password</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PasswordInput
          {...register('password')}
          label='Current Password'
          placeholder="Enter your current password"
          classNames={{ input: 'form-input' }}
          withAsterisk
        />
        <Text style={{ color: theme.colors.red[8] }} size="sm">
          {errors.password?.message}
        </Text>

        <PasswordInput
          {...register('newPassword')}
          label='New Password'
          placeholder="Enter new password"
          classNames={{ input: 'form-input' }}
          withAsterisk
        />
        <Text style={{ color: theme.colors.red[8] }} size="sm">
          {errors.newPassword?.message}
        </Text>
        <Button
          type="submit"
          disabled={!isValid}
          onClick={onClose}
          style={{marginTop: '24px'}}
          className="button"
          fullWidth
          >Save
        </Button>
        <Button
          onClick={onClose}
          style={{marginTop: '16px'}}
          className="button button--secondary"
          fullWidth
          >Cancel
        </Button>
      </form>
    </>
  )
}