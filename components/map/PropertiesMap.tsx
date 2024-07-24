"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import FlagImg from "../images/FlagImg";
import { PropertyType } from "@/types";
import { useRouter } from "next/navigation";

type PropertiesMapProps = {
  properties: PropertyType[];
};

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const PropertiesMap = ({ properties }: PropertiesMapProps) => {
  console.log("new");
  const router = useRouter();
  return (
    <MapContainer
      center={[52, 10]}
      zoom={3}
      scrollWheelZoom={false}
      className="rounded-md xl:h-[35vh] h-[25vh]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <div onClick={() => console.log("clicked")}>
        {properties.map((property) => (
          <div key={property._id} onClick={() => console.log("clicked")}>
            <Marker
              position={[
                property.location.cords.lat,
                property.location.cords.lng,
              ]}
              key={property._id}
            >
              <Popup>
                <div
                  className="flex flex-col gap-2 cursor-pointer"
                  onClick={() => router.push(`/property/${property._id}`)}
                >
                  <span className="text-lg">{property.name}</span>
                  <span>{property.location.street}</span>
                  <span>
                    {property.location.zipcode}{" "}
                    <span className="font-semibold text-theme-color ">
                      {property.location.city}
                    </span>
                  </span>
                  <div className="flex gap-2 items-center">
                    <FlagImg
                      code={property.location.state.code}
                      name={property.location.state.name}
                    />
                    <div>
                      <span className="text-md uppercase font-semibold my-0">
                        {property.location.state.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          </div>
        ))}
      </div>
    </MapContainer>
  );
};
export default PropertiesMap;
