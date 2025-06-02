import { ClientResponse, Customer } from "@commercetools/platform-sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, Stack, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { JSX, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { getUserInfo } from "../../shared/utils/get-user-info";
import { useAuthStore } from "../auth/auth-state";
import { updateUserInfo } from "./personal-info";
import { PersonalInfoFormData, personalInfoSchema } from "@/shared/validation/profile-validation";

export function PersonalInfoForm({ onClose }: { onClose: () => void }) {
  const theme = useMantineTheme();

  const [calendarValue, setCalendarValue] = useState<Date | null>(null);
  dayjs.extend(customParseFormat);
  
  const status = useAuthStore((state) => state.status);
  const isAuthenticated = status === 'AUTHENTICATED';
  
  const [user, setUser] = useState<ClientResponse<Customer> | null>(null);
  
  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useForm<PersonalInfoFormData>({
    mode: 'onChange',
    resolver: zodResolver(personalInfoSchema)
  });

  useEffect(() => {
    const getUser = async () => {
      if (isAuthenticated) {
        const user = await getUserInfo();
        if (user) {
          setUser(user);
          setValue('firstName', user.body.firstName || '', { shouldValidate: true });
          setValue('lastName', user.body.lastName || '', { shouldValidate: true });
          setValue('email', user.body.email, { shouldValidate: true }) ;
          if (user.body.dateOfBirth) {
            const birthDate = new Date(user.body.dateOfBirth);
            setCalendarValue(birthDate);
            setValue('birthDate', birthDate.toLocaleDateString('en-CA'), { shouldValidate: true });
          }
        }
      }
    };
    getUser();
  }, [isAuthenticated, setValue]);

  const onSubmit: SubmitHandler<PersonalInfoFormData> = async (data) => {
    if (data.birthDate) {
      await updateUserInfo(data.firstName, data.lastName, data.email, data.birthDate);
      onClose();
    }
  };

  return(
    <>
      <Title size='24px' style={{marginBottom: '32px', textAlign: 'center'}}>Edit personal information</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack style={{ gap: 7 }}>
              <TextInput
                {...register('firstName')}
                defaultValue={user?.body.firstName}
                label='First Name'
                placeholder="Enter first name"
                classNames={{ input: 'form-input' }}
                withAsterisk
              />
              <Text style={{ color: theme.colors.red[8] }} size="sm">
                {errors.firstName?.message}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack style={{ gap: 7 }}>
              <TextInput
                {...register('lastName')}
                defaultValue={user?.body.lastName}
                label='Last Name'
                placeholder="Enter last name"
                classNames={{ input: 'form-input' }}
                withAsterisk
              />
              <Text style={{ color: theme.colors.red[8] }} size="sm">
                {errors.lastName?.message}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack style={{ gap: 7 }}>
              <TextInput
                {...register('email')}
                defaultValue={user?.body.email}
                label='Email'
                placeholder="Enter email"
                classNames={{ input: 'form-input' }}
                withAsterisk
              />
              <Text style={{ color: theme.colors.red[8] }} size="sm">
                {errors.email?.message}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack style={{ gap: 7 }}>
              <Controller<PersonalInfoFormData>
                name="birthDate"
                control={control}
                render={({ field }): JSX.Element => (
                  <DateInput
                    value={calendarValue}
                    onChange={(date: Date | null) => {
                      setCalendarValue(date);
                      field.onChange(date?.toLocaleDateString('en-CA'));
                      trigger('birthDate');
                    }}
                    label="Date of Birth"
                    classNames={{ input: 'form-input' }}
                    dateParser={(value) => dayjs(value, 'DD.MM.YYYY').toDate()}
                    valueFormat="DD.MM.YYYY"
                    placeholder="dd.mm.yyyy"
                    maxDate={new Date()}
                    withAsterisk
                  />
                )}
              />
              <Text style={{ color: theme.colors.red[8] }} size="sm">
                {errors.birthDate?.message}
              </Text>
            </Stack>
          </Grid.Col>
        </ Grid>
        <Button
          type="submit"
          disabled={!isValid}
          onClick={onClose}
          style={{marginTop: '24px'}}
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