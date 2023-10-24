/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CityType, useCities } from "../../contexts/CitiesContext";
import { convertToEmoji } from "../../utils/helpers";
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";
import { v4 } from "uuid";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const { createCity, isLoading } = useCities();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat: string = searchParams.get("lat") as string;
  const lng: string = searchParams.get("lng") as string;

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString());
  const [notes, setNotes] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");
  const [geocodingError, setGeocodingError] = useState<string>("");

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityInfo() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) {
          console.error(
            "That doesn't seem to be a city. Click somewhere else 😉",
          );
          setGeocodingError(
            "That doesn't seem to be a city. Click somewhere else 😉",
          );
        }

        setCityName(data.city);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err: any) {
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    fetchCityInfo();
  }, [lat, lng]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity: CityType = {
      cityName,
      countryName: country,
      date,
      emoji,
      notes,
      position: {
        lat,
        lng,
      },
      cityId: v4(),
    };

    createCity(newCity);
    navigate(-1);
  }

  if (isLoadingGeocoding) return <Loader />;

  if (!lat && !lng) return <p>Start by clicking somewhere on the map.</p>;

  if (geocodingError) return <Error error={geocodingError} />;

  return !isLoading ? (
    <form
      onSubmit={handleSubmit}
      className="my-6 flex w-[70%] flex-col gap-4 rounded-lg bg-orange-200 p-4 md:gap-6"
    >
      <div className="relative z-0 flex flex-col gap-2 ">
        <label
          className="text-sm font-medium lg:text-base lg:leading-tight 2xl:text-lg"
          htmlFor="cityName"
        >
          City Name
        </label>
        <input
          className="rounded-md py-1 pl-2 pr-6 font-sans text-sm xl:py-2 xl:pl-3 2xl:text-base"
          onChange={(e) => setCityName(e.target.value)}
          type="text"
          id="cityName"
          defaultValue={cityName}
        />
        <span className="absolute right-[6px] top-[32px] xl:top-[34px] xl:text-lg 2xl:top-[44px]">
          {emoji}
        </span>
      </div>
      <div className="flex flex-col gap-2 md:gap-3">
        <label
          className="text-sm font-medium lg:text-base lg:leading-tight 2xl:text-lg"
          htmlFor="visitDate"
        >
          When did you go to {cityName}
        </label>
        <input
          className="rounded-md px-2 py-1 font-sans text-sm xl:px-3 xl:py-2 2xl:text-base"
          onChange={(e) => setDate(new Date(e.target.value).toISOString())}
          type="date"
          min="1927-01-01"
          id="visitDate"
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-3">
        <label
          className=" text-sm font-medium lg:text-base lg:leading-tight 2xl:text-lg"
          htmlFor="notes"
        >
          Notes about your trip to {cityName}
        </label>
        <textarea
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tell us something about your trip..."
          name="notes"
          id="notes"
          rows={3}
          className="resize-none rounded-md px-2 py-1 text-sm xl:px-3 xl:py-2"
        ></textarea>
      </div>
      <div className="flex justify-between">
        <button
          className="mt-3 block rounded-lg border-2 border-orange-400 bg-white px-3 py-2 text-sm font-medium uppercase text-orange-600 transition-colors duration-300 hover:bg-stone-100 lg:px-4 lg:py-3 lg:text-base"
          type="submit"
        >
          + Add
        </button>
        <span
          onClick={() => navigate(-1)}
          className="mt-3 flex items-center rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium uppercase text-stone-50 transition-colors duration-300 hover:bg-orange-700 lg:px-4 lg:py-3 lg:text-base"
        >
          &larr; Back
        </span>
      </div>
    </form>
  ) : (
    <Loader />
  );
}

export default Form;
