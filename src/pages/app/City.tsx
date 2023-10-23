/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
import { formatDateLong } from "../../utils/helpers";
import Error from "../../ui/Error";
import Loader from "../../ui/Loader";

function City() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentCity, getCity, isLoading, error } = useCities();

  useEffect(() => {
    if (id) {
      getCity(id);
    }
  }, [getCity, id]);

  if (isLoading) return <Loader />;
  else {
    return error ? (
      <Error error={error} />
    ) : (
      Object.keys(currentCity).length > 0 && (
        <div className="mx-4 my-4 flex flex-col gap-4 rounded-md bg-orange-100 p-4 md:mx-6 md:my-6 lg:w-[320px] lg:p-6 xl:gap-5 2xl:w-[70%]">
          <div className="flex flex-col gap-1 font-semibold text-stone-800">
            <span className="text-xs font-semibold  uppercase text-orange-400 2xl:text-sm">
              City Name
            </span>
            <span className="text-base text-stone-700 2xl:text-xl">
              <span className="text-lg 2xl:text-2xl">{currentCity.emoji}</span>{" "}
              {currentCity.cityName}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase text-orange-400 2xl:text-sm">
              You went to {currentCity.cityName} on
            </span>
            <span className="text-sm text-stone-600 2xl:text-lg">
              {currentCity.date && formatDateLong(currentCity.date)}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase text-orange-400 2xl:text-sm">
              Your notes
            </span>
            <span className="text-sm text-stone-600 2xl:text-lg">
              {currentCity.notes}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase text-orange-400 2xl:text-sm">
              Learn more
            </span>
            <span className="text-sm text-slate-700 underline 2xl:text-lg">
              <a
                href={`https://en.wikipedia.org/wiki/${currentCity.cityName}`}
                target="_blank"
                rel="noreferrer"
              >
                Check out {currentCity.cityName} on Wikipedia &rarr;
              </a>
            </span>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-3 block self-start rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium uppercase text-stone-50 transition-colors duration-300 hover:bg-orange-700 lg:px-4 lg:py-3 lg:text-base"
          >
            &larr; Back
          </button>
        </div>
      )
    );
  }
}

export default City;
