import { zodResolver } from "@hookform/resolvers/zod";
import { Fieldset, TextInput, PasswordInput, Combobox, Checkbox, Button, useCombobox, InputBase, Input, Text, Group } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { JSX, useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { RegistrationFormData, registrationSchema } from "@/shared/validation/registration-validation";
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css";

export function RegistrationForm() {
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<RegistrationFormData>({mode: "onChange", resolver: zodResolver(registrationSchema)});
  
  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    console.log(data);
  }

  // BirthDate Input
  const [calendarValue, setCalendarValue] = useState<Date | null>(null);
  dayjs.extend(customParseFormat);

  // Country selects
  const countries = [
    'Italy',
    'France',
    'Spain',
  ];

  const deliveryCountrySelect = useCombobox({
    onDropdownClose: () => deliveryCountrySelect.resetSelectedOption(),
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
    // const checked = event.target.checked;
    setSameAddress(event.target.checked);
  };
  
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

  // UI
  const renderAddressFields = (type: 'delivery' | 'billing') => {
    return (
      <Fieldset>
        {/* <Controller<RegistrationFormData>
          name={`${type}Address.country`}
          control={control}
          render={({ field }): JSX.Element => (
            <Combobox
              store={`${type}CountrySelect`}
              withinPortal={false}
              onOptionSubmit={(value) => {
                field.onChange(value);
                setDeliveryCountryValue(value);
                deliveryCountrySelect.closeDropdown();
              }}
            >
            <Combobox.Target>
              <InputBase
                component="button"
                type="button"
                pointer
                rightSection={<Combobox.Chevron />}
                onClick={() => deliveryCountrySelect.toggleDropdown()}
                onChange={(event) => setDeliveryCountryValue(event.currentTarget.value)}
                rightSectionPointerEvents="none"
              >
                {deliveryCountryValue || <Input.Placeholder>Select country</Input.Placeholder>}
              </InputBase>
            </Combobox.Target>
            <Combobox.Dropdown>
              <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
            </Combobox>
          )}
        />
        <Text>{errors.deliveryAddress?.country?.message}</Text> */}
        <Group>
          <TextInput
            {...register(`${type}Address.street`)}
            id={`${type}-street`}
            placeholder="Enter street"
            className="form-input"
            withAsterisk
          />
          <Text c="red" size="sm">{errors[`${type}Address`]?.street?.message}</Text>
        </Group>
        <Group>
          <TextInput
            {...register(`${type}Address.city`)}
            id={`${type}-city`}
            placeholder="Enter city"
            className="form-input"
            withAsterisk
          />
          <Text c="red" size="sm">{errors[`${type}Address`]?.city?.message}</Text>

          <TextInput
            {...register(`${type}Address.postcode`)}
            id={`${type}-postcode`}
            placeholder="Enter postcode"
            className="form-input"
            withAsterisk
          />
          <Text c="red" size="sm">{errors[`${type}Address`]?.postcode?.message}</Text>
        </Group>
      </Fieldset>
    );
  };

  //Form 
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
    <TextInput {...register("firstName")}
      label="First Name"
      id="firstname"
      className="form-input"
      withAsterisk
    />
    <Text c="red" size="sm">{errors.firstName?.message}</Text>
    <TextInput {...register("lastName")}
      label="Last Name"
      id="lastname"
      className="form-input"
      withAsterisk
    />
    <Text c="red" size="sm">{errors.lastName?.message}</Text>
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
          id="dob"
          className="form-input"
          dateParser={(value) => dayjs(value, 'DD.MM.YYYY').toDate()}
          valueFormat="DD.MM.YYYY"
          placeholder="dd.mm.yyyy"
          maxDate={new Date()}
          withAsterisk
        />
      }
    />
    <Text c="red" size="sm">{errors.birthDate?.message}</Text>
    <TextInput {...register("email")}
      label="Email"
      id="email"
      className="form-input"
      withAsterisk
    />
    <Text c="red" size="sm">{errors.email?.message}</Text>
    <PasswordInput {...register("password")}
      label="Password"
      id="password"
      className="form-input"
      withAsterisk
    />
    <Text c="red" size="sm">{errors.password?.message}</Text>

    <Fieldset legend="Delivery address">
      <Fieldset>
      <Controller<RegistrationFormData>
        name="deliveryAddress.country"
        control={control}
        render={({ field }): JSX.Element => (
          <Combobox
            store={deliveryCountrySelect}
            withinPortal={false}
            onOptionSubmit={(value) => {
              field.onChange(value);
              setDeliveryCountryValue(value);
              deliveryCountrySelect.closeDropdown();
            }}
          >
          <Combobox.Target>
            <InputBase
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              onClick={() => deliveryCountrySelect.toggleDropdown()}
              onChange={(event) => setDeliveryCountryValue(event.currentTarget.value)}
              rightSectionPointerEvents="none"
            >
              {deliveryCountryValue || <Input.Placeholder>Select country</Input.Placeholder>}
            </InputBase>
          </Combobox.Target>
          <Combobox.Dropdown>
            <Combobox.Options>{options}</Combobox.Options>
          </Combobox.Dropdown>
          </Combobox>
        )}
      />
      <Text c="red" size="sm">{errors.deliveryAddress?.country?.message}</Text>
      {renderAddressFields('delivery')}
      </Fieldset>
      <Checkbox
        {...register("deliveryAddress.isDefaultAddress")}
        label="Set as default delivery address"
      />
    </Fieldset>

    <Fieldset legend="Billing address">
      <Fieldset disabled={sameAddress}>
        <Controller<RegistrationFormData>
            name="billingAddress.country"
            control={control}
            render={({ field }): JSX.Element => (
              <Combobox
                store={billingCountrySelect}
                withinPortal={false}
                onOptionSubmit={(value) => {
                  field.onChange(value);
                  setBillingCountryValue(value);
                  billingCountrySelect.closeDropdown();
                }}
              >
              <Combobox.Target>
                <InputBase
                  component="button"
                  type="button"
                  pointer
                  rightSection={<Combobox.Chevron />}
                  onClick={() => billingCountrySelect.toggleDropdown()}
                  onChange={(event) => setBillingCountryValue(event.currentTarget.value)}
                  rightSectionPointerEvents="none"
                >
                  {billingCountryValue || <Input.Placeholder>Select country</Input.Placeholder>}
                </InputBase>
              </Combobox.Target>
              <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
              </Combobox.Dropdown>
              </Combobox>
            )}
          />
          <Text c="red" size="sm">{errors.billingAddress?.country?.message}</Text>
          {renderAddressFields('billing')}
      </Fieldset>
      <Checkbox
        {...register("billingAddress.sameAsDelivery")}
        label="Same as delivery address"
        checked={sameAddress}
        onChange={handleSameAddressChange}
        />
      <Checkbox
        {...register("billingAddress.isDefaultAddress")}
        label="Set as default billing address"
      />
    </Fieldset>
    <Button className="button button--primary button--large auth-button" variant="filled" type="submit">Sign Up</Button>
    </form>
  )
}