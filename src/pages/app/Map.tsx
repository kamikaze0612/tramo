import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useCities } from "../../contexts/CitiesContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../../hooks/useGeoLocation";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Error from "../../ui/Error";

function Map() {
  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 100]);
  const { position, getPosition, error, isLoading } = useGeolocation();
  const { lat: mapLat, lng: mapLng } = useUrlPosition();
  const { cities } = useCities();

  function handleGoToUserLocation() {
    getPosition();
  }

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([+mapLat, +mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (position) setMapPosition([position.lat, position.lng]);
  }, [position]);

  return (
    <>
      <div className="relative h-[calc(100vh-45%)] bg-slate-100 md:h-full md:flex-1">
        {!position &&
          (!error ? (
            <button
              onClick={handleGoToUserLocation}
              className="absolute bottom-[6vh] left-1/2 z-50 rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold uppercase text-white lg:text-lg"
            >
              {!isLoading ? "Go to your location" : "Loading..."}
            </button>
          ) : (
            <Error error={error} />
          ))}
        <MapContainer
          className="z-10 h-full"
          center={mapPosition}
          zoom={6}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {cities.map((city) => {
            return (
              <Marker
                position={[+city.position.lat, +city.position.lng]}
                key={city.id}
              >
                <Popup className="text-lg">
                  {city.emoji} {city.cityName}
                </Popup>
              </Marker>
            );
          })}
          {position && (
            <Marker
              position={[position.lat, position.lng]}
              key={new Date().getTime()}
            >
              <Popup className="text-lg">Your location</Popup>
            </Marker>
          )}

          <ChangeCenter position={mapPosition} />
          <DetectClick />
        </MapContainer>
      </div>
    </>
  );
}

type ChangeCenterProps = {
  position: [number, number];
};

function ChangeCenter({ position }: ChangeCenterProps) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  const map = useMapEvents({
    click(e) {
      navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
}

export default Map;
