import { countries } from "../constants/countries";

export const getCountryCode = (country: string) => {
  return Object.keys(countries)[Object.values(countries).indexOf(country)];
}