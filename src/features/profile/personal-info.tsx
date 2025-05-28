import { ClientResponse, Customer } from "@commercetools/platform-sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, Stack, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../auth/auth-state";
import { getUserInfo } from "./profile";
import { PersonalInfoFormData, personalInfoSchema } from "@/shared/validation/profile-validation";

export function PersonalInfoForm() {
  const theme = useMantineTheme();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<PersonalInfoFormData>({
    mode: 'onBlur',
    resolver: zodResolver(personalInfoSchema),
  });

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

  return(
    <>
      <Title>Edit personal information</Title>
    </>
  )
}