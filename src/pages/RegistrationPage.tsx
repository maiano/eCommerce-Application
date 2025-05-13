import { zodResolver } from "@hookform/resolvers/zod";
import { Title, Text, Anchor, Fieldset, TextInput, PasswordInput, Combobox, Checkbox, Button, useCombobox, InputBase, Input } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { JSX, useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css";
import { RegistrationFormData, registrationSchema } from "@/shared/validation/registration-validation";

dayjs.extend(customParseFormat);

export function RegistrationPage() {
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<RegistrationFormData>({mode: "onChange", resolver: zodResolver(registrationSchema)});

  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    console.log(data);
  }
  // Calendar
  const [calendarValue, setCalendarValue] = useState<Date | null>(null);

  // Addresses
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

  // Same address 
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



  return (
    <div className="page">
      <div className="page__container">
        <div className="content">
          <div className="content__container">
            <div className="auth-container">
              <div className="auth-form">
                <div className="header__logo">
                  <div className="header__logo-icon">
                    {/* <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
                            fill="currentColor"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z"
                            fill="currentColor"></path>
                    </svg> */}
                  </div>
                  <Title order={2} className="header__logo-text">Wine not</Title>
                </div>
                <Title order={1}  className="auth-title">Create Account</Title>

                
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  <TextInput {...register("firstName")}
                    label="First Name"
                    id="firstname"
                    className="form-input"
                    required
                    withAsterisk
                  />
                  <p>{errors.firstName?.message}</p>
                  <TextInput {...register("lastName")}
                    label="Last Name"
                    id="lastname"
                    className="form-input"
                    required
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
                        required
                        withAsterisk
                      />
                    }
                  />
                  <p>{errors.birthDate?.message}</p>
                  <TextInput {...register("email")}
                    label="Email"
                    id="email"
                    className="form-input"
                    required
                    withAsterisk
                  />
                  <p>{errors.email?.message}</p>
                  <PasswordInput {...register("password")}
                    label="Password"
                    id="password"
                    className="form-input"
                    required
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
                      required
                      withAsterisk
                    />
                    <p>{errors.deliveryAddress?.deliveryStreet?.message}</p>
                    <TextInput {...register('deliveryAddress.deliveryCity')}
                      id="delivery-city"
                      placeholder="Enter city"
                      className="form-input"
                      required
                      withAsterisk
                    />
                    <p>{errors.deliveryAddress?.deliveryCity?.message}</p>
                    <TextInput {...register("deliveryAddress.deliveryPostcode")}
                      id="delivery-postcode"
                      placeholder="Enter postcode"
                      className="form-input"
                      required
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
                          required
                          withAsterisk
                        />
                        <p>{errors.billingAddress?.billingStreet?.message}</p>
                        <TextInput {...register("billingAddress.billingCity")}
                          id="billing-city"
                          placeholder="Enter city"
                          className="form-input"
                          required
                          withAsterisk
                        />
                        <p>{errors.billingAddress?.billingCity?.message}</p>
                        <TextInput {...register("billingAddress.billingPostcode")}
                          id="billing-postcode"
                          placeholder="Enter postcode"
                          className="form-input"
                          required
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
                <div className="auth-footer">
                  <Text>Already have an account? <Anchor href="./signIn.html" className="auth-link">Log in</Anchor></Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}