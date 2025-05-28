import { ClientResponse, Customer } from "@commercetools/platform-sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, Stack, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { JSX, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "../auth/auth-state";
import { updateUserInfo } from "./personal-info";
import { getUserInfo } from "./profile";
import { PersonalInfoFormData, personalInfoSchema } from "@/shared/validation/profile-validation";

export function PersonalInfoForm() {
  const theme = useMantineTheme();

  const [calendarValue, setCalendarValue] = useState<Date | null>(null);
  dayjs.extend(customParseFormat);
  
  const status = useAuthStore((state) => state.status);
  const isAuthenticated = status === 'AUTHENTICATED';
  
  const [user, setUser] = useState<ClientResponse<Customer> | null>(null);
  
  useEffect(() => {
    const getUser = async () => {
      if (isAuthenticated) {
        const user = await getUserInfo();
        if (user) {
          setUser(user);
        }
      }
    };
    getUser();
  }, [isAuthenticated]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<PersonalInfoFormData>({
    mode: 'onBlur',
    resolver: zodResolver(personalInfoSchema)
  });

  const onSubmit: SubmitHandler<PersonalInfoFormData> = async (data) => {
    if (data.birthDate) {
      await updateUserInfo(data.firstName, data.lastName, data.email, data.birthDate);
  
      const updatedUser = await getUserInfo();
      if (updatedUser) {
        setUser(updatedUser);
      }
    }
  };


  useEffect(() => {
    if (user?.body) {
      setValue('firstName', user?.body.firstName || '');
      setValue('lastName', user?.body.lastName || '');
      setValue('email', user.body.email);
      if (user.body.dateOfBirth) {
        const birthDate = new Date(user.body.dateOfBirth);
        setCalendarValue(birthDate);
        setValue('birthDate', birthDate.toLocaleDateString('en-CA'));
      }
    }
  }, [user, setValue]);

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
          onClick={() => {
            // stack.close('update-info')
            // window.close();
            setTimeout(() => window.location.reload(), 200)
          }}
          style={{marginTop: '24px'}}
          fullWidth
          >Save
        </Button>
      </form>
    </>
  )
}