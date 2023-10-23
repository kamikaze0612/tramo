/* eslint-disable react-refresh/only-export-components */
import { useCities } from "../../contexts/CitiesContext";
import Error from "../../ui/Error";
import Loader from "../../ui/Loader";
import CityItem from "./CityItem";

function CityList() {
  const { isLoading, cities, error } = useCities();

  return error ? (
    <Error error={error} />
  ) : isLoading ? (
    <Loader />
  ) : (
    <ul className="mx-auto my-6 w-[240px] flex-col space-y-4 md:w-[200px] lg:my-8 lg:w-[240px] xl:w-[300px] 2xl:w-[360px]">
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
