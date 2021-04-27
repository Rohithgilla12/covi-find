import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import useSWR from "swr";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// import { useSelectedButton } from "../context/ButtonSelection";

const containerStyle = {
  width: "100vw",
  height: "80vh",
};

const customMarker = L.icon({
  iconUrl: "/icu-bed.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
interface MapProps {
  center: any;
  zoom?: number;
}

export const ChangeView: React.FC<MapProps> = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const MapComponent = () => {
  const [current, setCurrent] = useState({ lat: 18.4264677, lng: 79.1339878 });
  var lats: Array<number> = [];
  var longs: Array<number> = [];

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const createNavLink = (lat: number, long: number) => {
    if (
      navigator.platform.indexOf("iPhone") != -1 ||
      navigator.platform.indexOf("iPod") != -1 ||
      navigator.platform.indexOf("iPad") != -1
    )
      return `maps://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${lat},${long}`;
    else
      return `https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${lat},${long}`;
  };

  const getCenterPoint = () => {
    lats = [];
    longs = [];
    if (mapData) {
      Object.entries(mapData).forEach((key: any, _value: any) => {
        const position = key[1];
        console.log(position);
        lats.push(position["Lat"]);
        longs.push(position["Long"]);
      });
      const sumLat = lats.reduce((a: number, b: number) => a + b, 0);
      const sumLong = longs.reduce((a: number, b: number) => a + b, 0);
      setCurrent({
        lat: sumLat / lats.length,
        lng: sumLong / longs.length,
      });
    }
  };

  const { data: mapData, error: _mapError } = useSWR(
    "https://ach4l.pythonanywhere.com/covifind/delhi",
    fetcher
  );
  // const { selctedButton } = useSelectedButton();

  useEffect(() => {
    getCenterPoint();
  }, [mapData]);

  return (
    <MapContainer
      style={containerStyle}
      center={[current.lat, current.lng]}
      zoom={12}
    >
      <ChangeView center={[current.lat, current.lng]} zoom={12} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={customMarker} position={[current.lat, current.lng]}>
        <Popup>Hello</Popup>
      </Marker>
      {mapData &&
        Object.entries(mapData).map((key: any, value: any) => {
          const position = key[1];
          return (
            <Marker
              icon={customMarker}
              key={value}
              position={{
                lat: position["Lat"],
                lng: position["Long"],
              }}
            >
              <Popup minWidth={90}>
                <div style={{ color: "black" }}>
                  <div>{position["Hosp_name"]}</div>
                  <div>{position["Govt"]}</div>
                  <div>Lasted updated at {position["Last_updated"]}</div>
                  <div>Vacant ICU Beds {position["Vacant_ICU_beds"]}</div>
                  <div>Vacant Normal beds {position["Vacant_normal_beds"]}</div>
                  <div style={{ color: "blue" }}>
                    <a href={`tel:${position["Contact"].split(";")[0]}`}>
                      Contact {position["Contact"]}
                    </a>
                  </div>
                  <div style={{ color: "blue" }}>
                    <a href={createNavLink(position["Lat"], position["Long"])}>
                      Directions{" "}
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

export default MapComponent;
