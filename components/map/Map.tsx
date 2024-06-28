"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { CountryType } from "../addProperty/SelectCountry";

type MapProps = {
  cords: {
    lat: number;
    lng: number;
  };
  street: string;
  zipcode: string;
  city: string;
  state: CountryType;
};

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const Map = ({ cords, street, zipcode, city, state }: MapProps) => {
  const { lat, lng } = cords;
  console.log([lat, lng]);
  return (
    // <div className="w-full">
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={false}
      className="rounded-md h-96"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>
          <div className="flex flex-col gap-2">
            <span>{street}</span>
            <span>
              {zipcode}, {city}
            </span>
            <div className="flex gap-3">
              <span>{state.flag}</span>
              <span>{state.name}</span>
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
    // </div>
  );
};
export default Map;
