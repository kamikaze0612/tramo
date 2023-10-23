/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASE_URL = "http://localhost:8000";

enum CitiesActionKind {
  LOADING = "LOADING",
  CITIES_LOADED = "CITIES_LOADED",
  CITY_LOADED = "CITY_LOADED",
  CITY_REMOVE = "CITY_REMOVE",
  CITY_CREATED = "CITY_CREATED",
}

export type CityType = {
  id: string;
  cityName: string;
  countryName: string;
  notes: string;
  position: { lat: string; lng: string };
  emoji: string;
  date: string;
};

type StateType = {
  cities: CityType[];
  currentCity: CityType;
  isLoading: boolean;
};

const initialState: StateType = {
  cities: [],
  currentCity: {} as CityType,
  isLoading: false,
};

type CitiesPayloadType = CityType[];
type CityPayloadType = CityType;
type CityIdPayloadType = string;

type ActionType =
  | { type: CitiesActionKind.LOADING; payload: null }
  | { type: CitiesActionKind.CITIES_LOADED; payload: CitiesPayloadType }
  | { type: CitiesActionKind.CITY_LOADED; payload: CityPayloadType }
  | { type: CitiesActionKind.CITY_CREATED; payload: CityPayloadType }
  | { type: CitiesActionKind.CITY_REMOVE; payload: CityIdPayloadType };

function reducer(state: StateType, action: ActionType): StateType {
  const { type, payload } = action;

  switch (type) {
    case CitiesActionKind.LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case CitiesActionKind.CITIES_LOADED:
      return {
        ...state,
        cities: payload,
        isLoading: false,
      };

    case CitiesActionKind.CITY_LOADED:
      return {
        ...state,
        currentCity: payload,
        isLoading: false,
      };

    case CitiesActionKind.CITY_CREATED:
      return {
        ...state,
        cities: [...state.cities, payload],
        currentCity: payload,
        isLoading: false,
      };

    case CitiesActionKind.CITY_REMOVE:
      return {
        ...state,
        cities: state.cities.filter((city: CityType) => city.id !== payload),
        isLoading: false,
      };

    default:
      return state;
  }
}

type CitiesContextProviderProps = {
  children: ReactNode;
};

type CitiesContextType = {
  cities: CityType[];
  currentCity: CityType;
  isLoading: boolean;
  getCity: (id: string) => Promise<void>;
  createCity: (newCity: CityType) => Promise<void>;
  deleteCity: (id: string) => Promise<void>;
  error: string;
};

const CitiesContext = createContext<CitiesContextType | null>(null);

function CitiesContextProvider({ children }: CitiesContextProviderProps) {
  const [error, setError] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, currentCity, isLoading } = state;

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: CitiesActionKind.LOADING, payload: null });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        dispatch({ type: CitiesActionKind.CITIES_LOADED, payload: data });
      } catch (err: unknown) {
        setError("Couldn't fetch cities data.");
        throw new Error("Couldn't fetch cities data.");
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(async function (id: string): Promise<void> {
    dispatch({ type: CitiesActionKind.LOADING, payload: null });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      dispatch({ type: CitiesActionKind.CITY_LOADED, payload: data });
    } catch (err) {
      setError("Can't fetch the city💥");
      throw new Error("Can't fetch the city");
    }
  }, []);

  const createCity = useCallback(async function (newCity: CityType) {
    dispatch({ type: CitiesActionKind.LOADING, payload: null });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: CitiesActionKind.CITY_CREATED, payload: data });
    } catch {
      setError("There was an error creating the city...");
    }
  }, []);

  const deleteCity = async function (id: string) {
    dispatch({ type: CitiesActionKind.LOADING, payload: null });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: CitiesActionKind.CITY_REMOVE, payload: id });
    } catch (err) {
      setError("Couln't delete the city");
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("Context has been used outside of CitiesContextProvider!");

  return context;
}

export { CitiesContextProvider, useCities };
