import { zodResolver } from "@hookform/resolvers/zod";
import { Fieldset, TextInput, PasswordInput, Combobox, Checkbox, Button, useCombobox, InputBase, Input } from "@mantine/core";
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
    const checked = event.target.checked;
    setSameAddress(checked);
  };

  const deliveryFields = watch([
    "deliveryAddress.deliveryCountry",
    "deliveryAddress.deliveryCity",
    "deliveryAddress.deliveryStreet", 
    "deliveryAddress.deliveryPostcode"
  ]);

  useEffect(() => {
    if (sameAddress) {
      const [deliveryCountry, deliveryCity, deliveryStreet, deliveryPostcode] = deliveryFields;
      setValue("billingAddress.billingCountry", deliveryCountry);
      setBillingCountryValue(deliveryCountry);
      setValue("billingAddress.billingCity", deliveryCity);
      setValue("billingAddress.billingStreet", deliveryStreet);
      setValue("billingAddress.billingPostcode", deliveryPostcode);
    }
  }, [deliveryFields, sameAddress, setValue]);

  //UI 
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
    <TextInput {...register("firstName")}
      label="First Name"
      id="firstname"
      className="form-input"
      withAsterisk
    />
    <p>{errors.firstName?.message}</p>
    <TextInput {...register("lastName")}
      label="Last Name"
      id="lastname"
      className="form-input"
      withAsterisk
    />
    <p>{errors.lastName?.message}</p>
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
    <p>{errors.birthDate?.message}</p>
    <TextInput {...register("email")}
      label="Email"
      id="email"
      className="form-input"
      withAsterisk
    />
    <p>{errors.email?.message}</p>
    <PasswordInput {...register("password")}
      label="Password"
      id="password"
      className="form-input"
      withAsterisk
    />
    <p>{errors.password?.message}</p>

    <Fieldset legend="Delivery address">
      <Fieldset>
      <Controller<RegistrationFormData>
        name="deliveryAddress.deliveryCountry"
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
      <p>{errors.deliveryAddress?.deliveryCountry?.message}</p>
      <TextInput {...register("deliveryAddress.deliveryStreet")}
        id="delivery-street"
        placeholder="Enter street"
        className="form-input"
        withAsterisk
      />
      <p>{errors.deliveryAddress?.deliveryStreet?.message}</p>
      <TextInput {...register('deliveryAddress.deliveryCity')}
        id="delivery-city"
        placeholder="Enter city"
        className="form-input"
        withAsterisk
      />
      <p>{errors.deliveryAddress?.deliveryCity?.message}</p>
      <TextInput {...register("deliveryAddress.deliveryPostcode")}
        id="delivery-postcode"
        placeholder="Enter postcode"
        className="form-input"
        withAsterisk
      />
      <p>{errors.deliveryAddress?.deliveryPostcode?.message}</p>

      </Fieldset>
      <Checkbox
        {...register("deliveryAddress.isDefaultDeliveryAddress")}
        label="Set as default delivery address"
      />
    </Fieldset>

    <Fieldset legend="Billing address">
      <Fieldset disabled={sameAddress}>
        <Controller<RegistrationFormData>
            name="billingAddress.billingCountry"
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
          <p>{errors.billingAddress?.billingCountry?.message}</p>
          <TextInput {...register("billingAddress.billingStreet")}
            id="billing-street"
            placeholder="Enter street"
            className="form-input"
            withAsterisk
          />
          <p>{errors.billingAddress?.billingStreet?.message}</p>
          <TextInput {...register("billingAddress.billingCity")}
            id="billing-city"
            placeholder="Enter city"
            className="form-input"
            withAsterisk
          />
          <p>{errors.billingAddress?.billingCity?.message}</p>
          <TextInput {...register("billingAddress.billingPostcode")}
            id="billing-postcode"
            placeholder="Enter postcode"
            className="form-input"
            withAsterisk
          />
          <p>{errors.billingAddress?.billingPostcode?.message}</p>

      </Fieldset>
      <Checkbox
        {...register("billingAddress.sameAsDelivery")}
        label="Same as delivery address"
        checked={sameAddress}
        onChange={handleSameAddressChange}
        />
      <Checkbox
        {...register("billingAddress.isDefaultBillingAddress")}
        label="Set as default billing address"
      />
    </Fieldset>
    <Button className="button button--primary button--large auth-button" variant="filled" type="submit">Sign Up</Button>
    </form>
  )
}