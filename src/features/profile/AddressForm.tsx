import { BaseAddress, ClientResponse, Customer } from "@commercetools/platform-sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Combobox, Grid, Input, InputBase, Stack, Text, TextInput, Title, useCombobox, useMantineTheme } from "@mantine/core";
import { JSX, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "../auth/auth-state";
import { addAddress, updateAddress } from "./address";
import { getUserInfo } from "./profile";
import { countries } from "@/shared/constants/countries";
import { getCountryCode } from "@/shared/utils/get-country-code";
import { AddressFormData, addressSchema } from "@/shared/validation/profile-validation";

export function AddressForm({ onClose, type, address, onUpdate }: { onClose: () => void, type: 'add' | 'edit', address: BaseAddress | null, onUpdate?: () => void}) {
  const theme = useMantineTheme();

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useForm<AddressFormData>({
    mode: 'onChange',
    resolver: zodResolver(addressSchema)
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
          if (address?.country) {
            setValue('country', countries[address.country as keyof typeof countries]);
            setCountryValue(countries[address.country as keyof typeof countries]);
            trigger('country');
          }
          if (address?.city) {
            setValue('city', address.city);
          }
          if (address?.streetName) {
            setValue('street', address.streetName);
          }
          if (address?.postalCode) {
            setValue('postcode', address.postalCode);
          }
        }
      }
    };
    getUser();
  }, [isAuthenticated, setValue, address, trigger]);

  const countrySelect = useCombobox({
    onDropdownClose: () => countrySelect.resetSelectedOption(),
  });
  const [countryValue, setCountryValue] = useState<string | null>(null);

  const options = Object.values(countries).map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const onNewAddressSubmit: SubmitHandler<AddressFormData> = async (data) => {
    const country = getCountryCode(data.country);
    await addAddress(country, data.city, data.street, data.postcode);
    if (onUpdate) {
      onUpdate();
    }
    onClose();
  };

  const onUpdatedAddressSubmit: SubmitHandler<AddressFormData> = async (data) => {
    const country = getCountryCode(data.country);
    await updateAddress(address?.id, country, data.city, data.street, data.postcode);
    if (onUpdate) {
      onUpdate();
    }
    onClose();
  };

  const submit = type === 'add' ? onNewAddressSubmit : onUpdatedAddressSubmit;
  const titleText = type === 'add' ? 'Add new address' : 'Edit address';

  return(
    <>
      <Title size='24px' style={{marginBottom: '32px', textAlign: 'center'}}>{titleText}</Title>
      <form onSubmit={handleSubmit(submit)}>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack style={{ gap: 5 }}>
            <Controller<AddressFormData>
              name='country'
              control={control}
              render={({ field }): JSX.Element => (
                <Combobox
                store={countrySelect}
                withinPortal={false}
                onOptionSubmit={(val) => {
                  field.onChange(val);
                  setCountryValue(val);
                  countrySelect.closeDropdown();
                }}
                >
                <Combobox.Target>
                  <InputBase
                    label="Country"
                    withAsterisk
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    onClick={() => countrySelect.toggleDropdown()}
                    rightSectionPointerEvents="none"
                    classNames={{ input: 'form-input' }}
                    >
                    { type === 'add' ? countryValue ||<Input.Placeholder>Select country</Input.Placeholder> : countryValue || countries[address?.country as keyof typeof countries] ||<Input.Placeholder>Select country</Input.Placeholder>}
                  </InputBase>
                </Combobox.Target>
                <Combobox.Dropdown>
                  <Combobox.Options>{options}</Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>
              )}
            />
              <Text style={{ color: theme.colors.red[8] }} size="sm">
                {errors.country?.message}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack style={{ gap: 7 }}>
              <TextInput
                {...register('city')}
                label='City'
                placeholder="Enter city"
                classNames={{ input: 'form-input' }}
                withAsterisk
              />
              <Text style={{ color: theme.colors.red[8] }} size="sm">
                {errors.city?.message}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack style={{ gap: 7 }}>
              <TextInput
                {...register('street')}
                label='Street'
                placeholder="Enter street"
                classNames={{ input: 'form-input' }}
                withAsterisk
              />
              <Text style={{ color: theme.colors.red[8] }} size="sm">
                {errors.street?.message}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack style={{ gap: 7 }}>
              <TextInput
                {...register('postcode')}
                label='Postcode'
                placeholder="Enter postcode"
                classNames={{ input: 'form-input' }}
                withAsterisk
              />
              <Text style={{ color: theme.colors.red[8] }} size="sm">
                {errors.postcode?.message}
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
        <Button
          type="submit"
          disabled={!isValid}
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