import { useState } from "react";

type PositionType = {
  lat: number;
  lng: number;
};

export function useGeolocation(defaultPosition: PositionType | null = null) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<PositionType>(
    defaultPosition as PositionType,
  );
  const [error, setError] = useState<string>("");

  function getPosition() {
    if (!navigator.geolocation) {
      return setError("Your browser doesn't support GeoLocation");
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }

  return { getPosition, error, position, isLoading };
}
