import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import useSWR from "swr";
import "leaflet/dist/leaflet.css";
import { Options, useSelectedButton } from "../context/ButtonSelection";
import { RenderMarkers } from "./RenderMarkers";
import L, { LatLng } from "leaflet";

const patientMarker = L.icon({
  iconUrl: "/patient.png",
  iconSize: [32, 32],
  iconAnchor: [10, 32],
  popupAnchor: [2, -32],
});

const containerStyle = {
  width: "100vw",
  height: "80vh",
};
interface MapProps {
  center: any;
  zoom?: number;
}

export const ChangeView: React.FC<MapProps> = ({ center, zoom }) => {
  const map = useMap();
  map.locate();
  map.setView(center, zoom);
  return null;
};

export const LocationMarker = () => {
  const [position, setPosition] = useState<LatLng>();

  useMapEvents({
    locationfound(e) {
      if (e) {
        setPosition(e.latlng);
      }
    },
  });

  return position === undefined ? null : (
    <Marker icon={patientMarker} position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

interface MapComponentProps {
  id: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ id }) => {
  const [current, setCurrent] = useState({ lat: 18.4264677, lng: 79.1339878 });
  var lats: Array<number> = [];
  var longs: Array<number> = [];
  const [positions, setPositions] = useState();

  const { selctedButton } = useSelectedButton();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: mapData, error: _mapError } = useSWR(
    `https://ach4l.pythonanywhere.com/covifind/${id}`,
    fetcher
  );

  const getCenterPoint = () => {
    lats = [];
    longs = [];
    if (mapData) {
      Object.entries(mapData).forEach((key: any, _value: any) => {
        const position = key[1];
        lats.push(position["lat"]);
        longs.push(position["long"]);
      });
      const sumLat = lats.reduce((a: number, b: number) => a + b, 0);
      const sumLong = longs.reduce((a: number, b: number) => a + b, 0);
      setCurrent({
        lat: sumLat / lats.length,
        lng: sumLong / longs.length,
      });
      setPositions(mapData);
    }
  };

  useEffect(() => {
    getCenterPoint();
  }, [mapData]);

  useEffect(() => {
    var localPositions: any = [];
    if (mapData) {
      Object.entries(mapData).map((key: any, _value: any) => {
        const position = key[1];
        if (selctedButton === Options.IcuBeds) {
          if (position["Available_ICU"] > 0) {
            localPositions.push(position);
          }
        } else if (selctedButton === Options.Beds) {
          if (position["Available_Gen"] > 0) {
            localPositions.push(position);
          }
        } else if (selctedButton === Options.Hospitals) {
          localPositions.push(position);
        } else if (selctedButton === Options.Venilator) {
          if (position["Available_Venti"] > 0) {
            localPositions.push(position);
          }
        }
      });
    }
    setPositions(localPositions);
  }, [selctedButton]);

  return (
    <MapContainer
      style={containerStyle}
      center={[current.lat, current.lng]}
      zoom={8}
      zoomControl={false}
    >
      <ChangeView center={[current.lat, current.lng]} zoom={8} />
      <LocationMarker />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {positions && <RenderMarkers positions={positions} />}
    </MapContainer>
  );
};

export default MapComponent;
