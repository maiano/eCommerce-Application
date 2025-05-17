import { zodResolver } from "@hookform/resolvers/zod";
import { Fieldset, TextInput, PasswordInput, Combobox, Checkbox, Button, useCombobox, InputBase, Input, Text, Grid, ComboboxStore, Stack, useMantineTheme } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { JSX, useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {apiClientManager} from './../../shared/lib/commercetools/api-client-manager';
import { RegistrationFormData, registrationSchema } from "@/shared/validation/registration-validation";

const showNotification = async (message: string, color: string) => {
  notifications.show({
    message: `${message}`,
    color: `${color}`,
    autoClose: 5000,
    withCloseButton: true,
  })
}

export function RegistrationForm() {
  const theme = useMantineTheme();
  const { register, handleSubmit, control, watch, trigger, setValue, formState: { errors } } = useForm<RegistrationFormData>({mode: "onChange", resolver: zodResolver(registrationSchema)});

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    const res = await apiClientManager.register({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.birthDate,
      addresses: [
        {
          country: Object.values(countryCodes)[Object.keys(countryCodes).indexOf(data.deliveryAddress.country)],
          streetName: data.deliveryAddress.street,
          postalCode: data.deliveryAddress.postcode,
          city: data.deliveryAddress.city,
        },
        {
          country: Object.values(countryCodes)[Object.keys(countryCodes).indexOf(data.billingAddress.country)],
          streetName: data.billingAddress.street,
          postalCode: data.billingAddress.postcode,
          city: data.billingAddress.city,
        }
      ],
      defaultShippingAddress: data.deliveryAddress.isDefaultAddress ? 0 : undefined,
      defaultBillingAddress: data.billingAddress.isDefaultAddress ? 1 : undefined,
      shippingAddresses: [0],
      billingAddresses: [1],
    });

    try {
      if (res.statusCode === 201) {
        await showNotification("Account has been successfully created", "green");
       // redirect
      }
      // if (res.statusCode === 400) {
      //   showNotification("Account with this email already exist. Log in or use another email", "red");
      // } 
    } catch (err) {
      console.log('catch');
      if (err instanceof Error && 'status' in err && err.status === 400) {
        showNotification("Account with this email already exist. Log in or use another email", "red");
      }
      // if (res.statusCode === 400) {
      //   showNotification("Account with this email already exist. Log in or use another email", "red");
      // } 
    }
  }

  // BirthDate Input
  const [calendarValue, setCalendarValue] = useState<Date | null>(null);
  dayjs.extend(customParseFormat);

  const countryCodes = {
    "Italy": "IT",
    "France": "FR",
    "Spain": "ES",
  }

  const countries = [
    'Italy',
    'France',
    'Spain',
  ];

  const deliveryCountrySelect = useCombobox({
    onDropdownClose: () => {
      deliveryCountrySelect.resetSelectedOption();
      setTimeout(() => {
        triggerErrorCheck();
      }, 200)
    },
  });

  const billingCountrySelect = useCombobox({
    onDropdownClose: () => billingCountrySelect.resetSelectedOption(),
  });

  const [deliveryCountryValue, setDeliveryCountryValue] = useState<string | null>(null);
  const [billingCountryValue, setBillingCountryValue] = useState<string | null>(null);

  const options = countries.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  // Same address checkbox
  const [sameAddress, setSameAddress] = useState(false);
  const handleSameAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSameAddress(event.target.checked);
    setTimeout(() => {
      trigger(["billingAddress.country", "billingAddress.city", "billingAddress.street", "billingAddress.postcode"])
    }, 200);
  };

  const triggerErrorCheck = () => {
    if (sameAddress) {
      trigger(["billingAddress.country", "billingAddress.city", "billingAddress.street", "billingAddress.postcode"])
    }
  }

  const deliveryFields = watch([
    "deliveryAddress.country",
    "deliveryAddress.city",
    "deliveryAddress.street",
    "deliveryAddress.postcode"
  ]);

  useEffect(() => {
    if (sameAddress) {
      const [deliveryCountry, deliveryCity, deliveryStreet, deliveryPostcode] = deliveryFields;
      setValue("billingAddress.country", deliveryCountry);
      setBillingCountryValue(deliveryCountry);
      setValue("billingAddress.city", deliveryCity);
      setValue("billingAddress.street", deliveryStreet);
      setValue("billingAddress.postcode", deliveryPostcode);
    }
  }, [deliveryFields, sameAddress, setValue]);

  // Address
  const renderCountrySelect = (
    name: 'deliveryAddress.country' | 'billingAddress.country',
    store: ComboboxStore,
    value: string | null,
    setValue: (value: string) => void
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
  )

  const renderAddressFields = (type: 'delivery' | 'billing') => {
    const countrySelect = type === 'delivery' ? deliveryCountrySelect : billingCountrySelect;
    const countryValue = type === 'delivery' ? deliveryCountryValue : billingCountryValue;
    const setCountryValue = type === 'delivery' ? setDeliveryCountryValue : setBillingCountryValue;
    const isDisabledOnSameAddress = type === 'delivery' ? false : sameAddress;

    return (
      <Fieldset legend={`${type.charAt(0).toUpperCase()}${type.slice(1)} address`} disabled={isDisabledOnSameAddress} style={{border: 'none', padding: '0.25rem 0'}}>
        <Grid gutter="md">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack style={{gap: 5}}>
            {renderCountrySelect(
              `${type}Address.country`,
              countrySelect,
              countryValue,
              setCountryValue
            )}
            <Text style={{color: theme.colors.red[8]}} size="sm">{errors[`${type}Address`]?.country?.message}</Text>
          </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack style={{gap: 7}}>
            <TextInput
              {...register(`${type}Address.street`)}
              placeholder="Enter street"
              classNames={{ input: 'form-input' }}
              withAsterisk
              onKeyUp={triggerErrorCheck}
            />
            <Text style={{color: theme.colors.red[8]}} size="sm">{errors[`${type}Address`]?.street?.message}</Text>
          </Stack>
          </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack style={{gap: 7}}>
            <TextInput
              {...register(`${type}Address.city`)}
              placeholder="Enter city"
              classNames={{ input: 'form-input' }}
              withAsterisk
              onKeyUp={triggerErrorCheck}
            />
            <Text style={{color: theme.colors.red[8]}} size="sm">{errors[`${type}Address`]?.city?.message}</Text>
          </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack style={{gap: 7}}>
            <TextInput
              {...register(`${type}Address.postcode`)}
              placeholder="Enter postcode"
              classNames={{ input: 'form-input' }}
              withAsterisk
              onKeyUp={triggerErrorCheck}
            />
            <Text style={{color: theme.colors.red[8]}} size="sm">{errors[`${type}Address`]?.postcode?.message}</Text>
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
        {...register("firstName")}
        label="First Name"
        classNames={{ input: 'form-input' }}
        withAsterisk
      />
      <Text style={{color: theme.colors.red[8]}} size="sm">{errors.firstName?.message}</Text>

      <TextInput
        {...register("lastName")}
        label="Last Name"
        classNames={{ input: 'form-input' }}
        withAsterisk
      />
      <Text style={{color: theme.colors.red[8]}} size="sm">{errors.lastName?.message}</Text>

      <Controller<RegistrationFormData>
        name="birthDate"
        control={control}
        render={({ field }): JSX.Element =>
          <DateInput
            value={calendarValue}
            onChange={(date: Date | null) => {
              setCalendarValue(date);
              field.onChange(date?.toLocaleDateString('en-CA'))
            }}
            label="Date of Birth"
            classNames={{ input: 'form-input' }}
            dateParser={(value) => dayjs(value, 'DD.MM.YYYY').toDate()}
            valueFormat="DD.MM.YYYY"
            placeholder="dd.mm.yyyy"
            maxDate={new Date()}
            withAsterisk
          />
        }
      />
      <Text style={{color: theme.colors.red[8]}} size="sm">{errors.birthDate?.message}</Text>

      <TextInput
        {...register("email")}
        label="Email"
        classNames={{ input: 'form-input' }}
        withAsterisk
      />
      <Text style={{color: theme.colors.red[8]}} size="sm">{errors.email?.message}</Text>

      <PasswordInput
        {...register("password")}
        label="Password"
        classNames={{ input: 'form-input' }}
        withAsterisk
      />
      <Text style={{color: theme.colors.red[8]}} size="sm">{errors.password?.message}</Text>

      {renderAddressFields('delivery')}

      <Checkbox styles={{ input: {borderRadius: '5px'}, root: {marginBottom: '1rem'}}}
        {...register("deliveryAddress.isDefaultAddress")}
        label="Set as default delivery address"
      />

      {renderAddressFields('billing')}

      <Grid gutter="md">
      <Grid.Col span={{ base: 12, sm: 6 }}>
      <Checkbox styles={{ input: {borderRadius: '5px'}}}
        {...register("billingAddress.sameAsDelivery")}
        label="Same as delivery address"
        checked={sameAddress}
        onChange={handleSameAddressChange}
      />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
      <Checkbox styles={{ input: {borderRadius: '5px'}}}
        {...register("billingAddress.isDefaultAddress")}
        label="Set as default billing address"
        />
        </Grid.Col>
        </Grid>

      <Button className="button button--primary button--large auth-button" variant="filled" type="submit" style={{margin: '0.5rem'}}>
        Sign Up
      </Button>
    </form>
  )
}
