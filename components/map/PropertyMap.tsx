"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { CountryType } from "../addProperty/SelectCountry";
import FlagImg from "../images/FlagImg";

type PropertyMapProps = {
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

const PropertyMap = ({
  cords,
  street,
  zipcode,
  city,
  state,
}: PropertyMapProps) => {
  const { lat, lng } = cords;
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
            <span className="font-semibold">{street}</span>
            <span>
              {zipcode}{" "}
              <span className="font-semibold text-theme-color ">{city}</span>
            </span>
            <div className="flex gap-2 items-center justify-center">
              <FlagImg code={state.code} name={state.name} />
              <div>
                <span className="text-md uppercase font-semibold my-0">
                  {state.name}
                </span>
              </div>
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};
export default PropertyMap;
