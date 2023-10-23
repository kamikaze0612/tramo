import { useCities } from "../../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import Error from "../../ui/Error";

export type CountryType = {
  country: string;
  emoji: string;
};

function CountryList() {
  const { cities, error } = useCities();

  const countries = cities.reduce((arr: CountryType[], city) => {
    if (!arr.map((el) => el.country).includes(city.countryName))
      return [...arr, { country: city.countryName, emoji: city.emoji }];
    else return arr;
  }, []);

  return !error ? (
    <div className="my-4 grid grid-cols-2 justify-items-center gap-x-2 gap-y-3 px-4 py-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-y-5 lg:py-6 xl:gap-x-10">
      {countries.map((country: CountryType, index: number) => (
        <CountryItem key={index} country={country} />
      ))}
    </div>
  ) : (
    <Error error={error} />
  );
}

export default CountryList;
