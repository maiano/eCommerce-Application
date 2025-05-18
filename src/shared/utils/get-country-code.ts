import { countries } from "../constants/countries";

export const getCountryCode = (country: string | undefined) => {
  if (country) {
    return Object.keys(countries)[Object.values(countries).indexOf(country)];
  } else {
    return '';
  }
}