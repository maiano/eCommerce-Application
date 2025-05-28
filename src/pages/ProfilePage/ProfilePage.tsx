import { BaseAddress, ClientResponse, Customer } from "@commercetools/platform-sdk";
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, Badge, Box, Button, Container, Grid, Group, Stack, Text, TextInput, Title, Modal, useMantineTheme, useModalsStack, Combobox, InputBase, Input, useCombobox } from "@mantine/core";
import '@/pages/ProfilePage/ProfilePage.css';
import { JSX, useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useAuthStore } from "@/features/auth/auth-state";
import { deleteAddress, updateAddress } from "@/features/profile/address";
import { PersonalInfoForm } from "@/features/profile/PersonalInfoForm";
import { getUserInfo } from "@/features/profile/profile";
import { countries } from "@/shared/constants/countries";
import { getCountryCode } from "@/shared/utils/get-country-code";
import { AddressFormData, addressSchema } from "@/shared/validation/profile-validation";

export function ProfilePage() {
  const theme = useMantineTheme();

  const stack = useModalsStack(['change-password', 'update-info', 'add-address', 'edit-address']);

  const [selectedAddress, setSelectedAddress] = useState<BaseAddress | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<AddressFormData>({
    mode: 'onBlur',
    resolver: zodResolver(addressSchema),
  });
  
  const onNewAddressSubmit: SubmitHandler<AddressFormData> = async (data) => {
    // await addAddress(data);
  };
  const onUpdatedAddressSubmit: SubmitHandler<AddressFormData> = async (data) => {
    const country = getCountryCode(data.country);
    await updateAddress(selectedAddress?.id, country, data.city, data.street, data.postcode);

    const updatedUser = await getUserInfo();
    if (updatedUser) {
      setUser(updatedUser);
    }
  };

  const countrySelect = useCombobox({
    onDropdownClose: () => countrySelect.resetSelectedOption(),
  });
  const [countryValue, setCountryValue] = useState<string | null>(null);

  const options = Object.values(countries).map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

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

  const renderAddressForm = (type: 'add' | 'edit') => {
    const submit = type === 'add' ? onNewAddressSubmit : onUpdatedAddressSubmit;

    return (
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
                    { type === 'add' ? countryValue ||<Input.Placeholder>Select country</Input.Placeholder> : countryValue || countries[selectedAddress?.country as keyof typeof countries] ||<Input.Placeholder>Select country</Input.Placeholder>}
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
          onClick={() => {
            stack.close('edit-address');
            stack.close('add-address');
          }}
          >Save
          </Button>
      </form>
    )
  }

  return (
    <Container className="page">
      <Container className="profile-container">
        <Title order={1} className="profile-title" style={{marginBottom:'24px'}}>
          My Profile
        </Title>
        <Box className="profile-container">
          <Box className="container-dark" style={{marginBottom:'24px'}}>
            <Group className="profile-section" justify="space-between">
              <Group>
                <Avatar className="profile-avatar" name={`${user?.body.firstName?.[0]} ${user?.body.lastName}`} color={theme.primaryColor} variant="filled" size="80px" style={{border: 'none', '--avatar-color': theme.colors.primary[9]}}></Avatar>
                <Box className="profile-info">
                  <Title order={2} className="profile-name" size="xl">
                    {user?.body.firstName} {user?.body.lastName}
                  </Title>
                </Box>
              </Group>
              <Group>
                <Button
                  className="button button--secondary"
                  onClick={() => stack.open('change-password')}
                  >Change Password
                </Button>
              </Group>
            </Group>
          </Box>
          <Container className="container-dark info-section" style={{marginBottom:'24px'}}>
            <Group justify="space-between" style={{marginBottom:'16px'}}>
            <Title order={2} className="profile-name" size="xl" >
              Personal Information
            </Title>
            <Button 
              className="button button--secondary"
              onClick={() => stack.open('update-info')}
              >Edit
            </Button>
            </Group>
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack style={{ gap: 5 }}>
                  <Text c={theme.colors.primary[3]} size="14px">First Name</Text>
                  <Text>{user?.body.firstName}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack style={{ gap: 5 }}>
                  <Text c={theme.colors.primary[3]} size="14px">Last Name</Text>
                  <Text>{user?.body.lastName}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack style={{ gap: 5 }}>
                  <Text c={theme.colors.primary[3]} size="14px">Email</Text>
                  <Text>{user?.body.email}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack style={{ gap: 5 }}>
                  <Text c={theme.colors.primary[3]} size="14px">Date of Birth</Text>
                  <Text>{user?.body.dateOfBirth}</Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Container>
          <Container className="container-dark address-section" style={{marginBottom:'24px'}}>
            <Title order={2} className="profile-name" size="xl" style={{marginBottom:'16px'}}>
              My addresses
            </Title>
            {user?.body.addresses.map((address, index) => (
              <Container className="address-item" style={{marginBottom:'16px'}} key={index}>
                <Group justify="space-between">
                  <Box>
                    <Badge style={{'--badge-color': theme.colors.primary[9], marginBottom: '12px'}} radius='sm'>
                      {address.id === user.body.defaultShippingAddressId ? 'Default shipping address':
                       address.id === user.body.defaultBillingAddressId ? 'Default billing address':
                       user.body.shippingAddressIds?.includes(address.id ?? '') ? 'Shipping address': 
                       user.body.billingAddressIds?.includes(address.id ?? '')? 'Billing address' : ''
                      }
                      </Badge>
                    <Text className="address-text">{address.streetName}</Text>
                    <Text className="address-text">{address.postalCode}</Text>
                    <Text className="address-text">{address.city}</Text>
                    <Text className="address-text">{countries[address.country as keyof typeof countries]}</Text>
                  </Box>
                  <Group>
                    <Button 
                      className="button button--secondary"
                      onClick={() => {
                        setSelectedAddress(address);
                        stack.open('edit-address');
                        setValue('country', countries[address.country as keyof typeof countries]);
                        if (address.city) {
                          setValue('city', address.city);
                        }
                        if (address.streetName) {
                          setValue('street', address.streetName);
                        }
                        if (address.postalCode) {
                          setValue('postcode', address.postalCode);
                        }
                      }}
                      >
                        Edit
                    </Button>
                    <Button
                      className="button button--secondary"
                      onClick={async() => {
                        deleteAddress(address.id);
                        const updatedUser = await getUserInfo();
                        if (updatedUser) {
                          setUser(updatedUser);
                        }
                      }}
                      >
                        Remove
                    </Button>
                  </Group>
                </Group>
              </Container>
            ))}

            <Button
              className="button button--primary button--medium"
              onClick={() => {
                setCountryValue(null);
                setValue('country', '');
                setValue('city', '');
                setValue('street', '');
                setValue('postcode', '');
                stack.open('add-address');
              }}
              >Add new address
            </Button>
            
            {/* Change password */}
            <Modal {...stack.register('change-password')}>
              Change password
            </Modal>
            {/* Update user info */}
            <Modal {...stack.register('update-info')} centered>
              <PersonalInfoForm/>
            </Modal>
            {/* Add address */}
            <Modal {...stack.register('add-address')} centered>
              <Title>Add new address</Title>
              {renderAddressForm('add')}
            </Modal>

            {/* Edit address */}
            <Modal {...stack.register('edit-address')}>
              <Title>Edit address</Title>
              {renderAddressForm('edit')}
            </Modal>
          </Container>
        </Box>
      </Container>
    </Container>
  )
}