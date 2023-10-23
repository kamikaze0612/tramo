import { useNavigate } from "react-router-dom";
import { CityType, useCities } from "../../contexts/CitiesContext";
import { formatDateShort } from "../../utils/helpers";

type CityItemProps = {
  city: CityType;
};

function CityItem({ city }: CityItemProps) {
  const navigate = useNavigate();
  const { deleteCity } = useCities();

  return (
    <li
      onClick={() =>
        navigate(`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`)
      }
      className="flex h-16 cursor-pointer items-center justify-between rounded-md border-l-4 border-orange-500 bg-orange-100 px-4 py-2 lg:h-20"
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-stone-900 lg:text-lg">
          <span className="mr-1 text-sm lg:text-base 2xl:text-xl">
            {city.emoji}
          </span>
          {city.cityName}
        </span>
        <span className="text-xs text-stone-700 lg:text-sm">
          {formatDateShort(city.date)}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteCity(city.id);
        }}
        className="p-2 text-base text-red-500 hover:text-red-700 md:text-lg lg:text-xl"
      >
        &times;
      </button>
    </li>
  );
}

export default CityItem;
