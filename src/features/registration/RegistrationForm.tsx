import { zodResolver } from '@hookform/resolvers/zod';
import {
  Fieldset,
  TextInput,
  PasswordInput,
  Combobox,
  Checkbox,
  Button,
  useCombobox,
  InputBase,
  Input,
  Text,
  Grid,
  ComboboxStore,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { JSX, useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useRegistration } from '@/features/registration/useRegistration';
import { countries } from '@/shared/constants/countries';
import {
  RegistrationFormData,
  registrationSchema,
} from '@/shared/validation/registration-validation';

export function RegistrationForm() {
  const theme = useMantineTheme();
  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    mode: 'onBlur',
    resolver: zodResolver(registrationSchema),
  });

  const { registerUser } = useRegistration();

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    await registerUser(data, sameAddress);
  };

  // Calendar
  const [calendarValue, setCalendarValue] = useState<Date | null>(null);
  dayjs.extend(customParseFormat);

  // Selects
  const shippingCountrySelect = useCombobox({
    onDropdownClose: () => {
      shippingCountrySelect.resetSelectedOption();
      setTimeout(() => {
        triggerErrorCheck();
      }, 200);
    },
  });

  const billingCountrySelect = useCombobox({
    onDropdownClose: () => billingCountrySelect.resetSelectedOption(),
  });

  const [shippingCountryValue, setShippingCountryValue] = useState<
    string | null
  >(null);
  const [billingCountryValue, setBillingCountryValue] = useState<string | null>(
    null,
  );

  const options = Object.values(countries).map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  // Same address checkbox
  const [sameAddress, setSameAddress] = useState(false);
  const handleSameAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSameAddress(event.target.checked);
    setTimeout(() => {
      trigger([
        'billingAddress.country',
        'billingAddress.city',
        'billingAddress.street',
        'billingAddress.postcode',
      ]);
    }, 200);
  };

  const triggerErrorCheck = () => {
    if (sameAddress) {
      trigger([
        'billingAddress.country',
        'billingAddress.city',
        'billingAddress.street',
        'billingAddress.postcode',
      ]);
    }
  };

  const shippingFields = watch([
    'shippingAddress.country',
    'shippingAddress.city',
    'shippingAddress.street',
    'shippingAddress.postcode',
  ]);

  useEffect(() => {
    if (sameAddress) {
      const [shippingCountry, shippingCity, shippingStreet, shippingPostcode] =
        shippingFields;
      if (shippingCountry) {
        setValue('billingAddress.country', shippingCountry);
        setBillingCountryValue(shippingCountry);
        setValue('billingAddress.city', shippingCity);
        setValue('billingAddress.street', shippingStreet);
        setValue('billingAddress.postcode', shippingPostcode);
      }
    }
  }, [shippingFields, sameAddress, setValue]);

  // Address
  const renderCountrySelect = (
    name: 'shippingAddress.country' | 'billingAddress.country',
    store: ComboboxStore,
    value: string | null,
    addressType: 'shippingAddress' | 'billingAddress',
    setValue: (value: string) => void,
  ) => (
    <Controller<RegistrationFormData>
      name={name}
      control={control}
      render={({ field }): JSX.Element => (
        <Stack>
          <Combobox
            store={store}
            withinPortal={false}
            onOptionSubmit={(value) => {
              field.onChange(value);
              setValue(value);
              store.closeDropdown();
            }}
          >
            <Combobox.Target>
              <InputBase
                component="button"
                type="button"
                pointer
                rightSection={<Combobox.Chevron />}
                onClick={() => store.toggleDropdown()}
                onChange={(event) => setValue(event.currentTarget.value)}
                rightSectionPointerEvents="none"
                classNames={{ input: 'form-input' }}
                className={errors[`${addressType}`]?.country ? 'error' : ''}
              >
                {value || <Input.Placeholder>Select country</Input.Placeholder>}
              </InputBase>
            </Combobox.Target>
            <Combobox.Dropdown>
              <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
        </Stack>
      )}
    />
  );

  const renderAddressFields = (type: 'shipping' | 'billing') => {
    const countrySelect =
      type === 'shipping' ? shippingCountrySelect : billingCountrySelect;
    const countryValue =
      type === 'shipping' ? shippingCountryValue : billingCountryValue;
    const setCountryValue =
      type === 'shipping' ? setShippingCountryValue : setBillingCountryValue;
    const isDisabledOnSameAddress = type === 'shipping' ? false : sameAddress;

    return (
      <Fieldset
        legend={`${type.charAt(0).toUpperCase()}${type.slice(1)} address`}
        disabled={isDisabledOnSameAddress}
        style={{ border: 'none', padding: '0.25rem 0' }}
      >
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack style={{ gap: 5 }}>
              {renderCountrySelect(
                `${type}Address.country`,
                countrySelect,
                countryValue,
                `${type}Address`,
                setCountryValue,
              )}
              <Text style={{ color: theme.colors.red[8] }} size="sm">
                {errors[`${type}Address`]?.country?.message}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack style={{ gap: 7 }}>
              <TextInput
                {...register(`${type}Address.street`)}
                placeholder="Enter street"
                classNames={{ input: 'form-input' }}
                className={errors[`${type}Address`]?.street ? 'error' : ''}
                withAsterisk
                onKeyUp={triggerErrorCheck}
              />
              <Text style={{ color: theme.colors.red[8] }} size="sm">
                {errors[`${type}Address`]?.street?.message}
              </Text>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack style={{ gap: 7 }}>
              <TextInput
                {...register(`${type}Address.city`)}
                placeholder="Enter city"
                classNames={{ input: 'form-input' }}
                className={errors[`${type}Address`]?.city ? 'error' : ''}
                withAsterisk
                onKeyUp={triggerErrorCheck}
              />
              <Text style={{ color: theme.colors.red[8] }} size="sm">
                {errors[`${type}Address`]?.city?.message}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack style={{ gap: 7 }}>
              <TextInput
                {...register(`${type}Address.postcode`)}
                placeholder="Enter postcode"
                classNames={{ input: 'form-input' }}
                className={errors[`${type}Address`]?.postcode ? 'error' : ''}
                withAsterisk
                onKeyUp={triggerErrorCheck}
              />
              <Text style={{ color: theme.colors.red[8] }} size="sm">
                {errors[`${type}Address`]?.postcode?.message}
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Fieldset>
    );
  };

  // Form
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register('firstName')}
        label="First Name"
        classNames={{ input: 'form-input' }}
        className={errors.firstName ? 'error' : ''}
        withAsterisk
      />
      <Text style={{ color: theme.colors.red[8] }} size="sm">
        {errors.firstName?.message}
      </Text>

      <TextInput
        {...register('lastName')}
        label="Last Name"
        classNames={{ input: 'form-input' }}
        className={errors.lastName ? 'error' : ''}
        withAsterisk
      />
      <Text style={{ color: theme.colors.red[8] }} size="sm">
        {errors.lastName?.message}
      </Text>

      <Controller<RegistrationFormData>
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
            className={errors.birthDate ? 'error' : ''}
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

      <TextInput
        {...register('email')}
        label="Email"
        classNames={{ input: 'form-input' }}
        withAsterisk
        className={errors.email ? 'error' : ''}
      />
      <Text style={{ color: theme.colors.red[8] }} size="sm">
        {errors.email?.message}
      </Text>

      <PasswordInput
        {...register('password')}
        label="Password"
        classNames={{ input: 'form-input' }}
        withAsterisk
        className={errors.password ? 'error' : ''}
      />
      <Text style={{ color: theme.colors.red[8] }} size="sm">
        {errors.password?.message}
      </Text>

      {renderAddressFields('shipping')}

      <Checkbox
        styles={{
          input: { borderRadius: '5px' },
          root: { marginBottom: '1rem' },
        }}
        {...register('shippingAddress.isDefaultAddress')}
        label="Set as default shipping address"
      />

      {renderAddressFields('billing')}

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Checkbox
            styles={{ input: { borderRadius: '5px' } }}
            {...register('billingAddress.sameAsShipping')}
            label="Same as shipping address"
            checked={sameAddress}
            onChange={handleSameAddressChange}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Checkbox
            styles={{ input: { borderRadius: '5px' } }}
            {...register('billingAddress.isDefaultAddress')}
            label="Set as default billing address"
          />
        </Grid.Col>
      </Grid>

      <Button
        className="button button--primary button--large auth-button"
        variant="filled"
        type="submit"
        style={{ margin: '0.5rem' }}
      >
        Sign Up
      </Button>
    </form>
  );
}
