import { CountryType } from "./CountryList";

type CountryItemProps = {
  country: CountryType;
};

function CountryItem({ country }: CountryItemProps) {
  return (
    <div className="flex h-16 w-full items-center gap-2 rounded-md border-r-4 border-orange-500 bg-orange-100 px-4 lg:h-24 lg:px-8">
      <span className="lg:text-2xl">{country.emoji}</span>
      <span className="text-sm font-medium md:text-base lg:text-lg">
        {country.country}
      </span>
    </div>
  );
}

export default CountryItem;
