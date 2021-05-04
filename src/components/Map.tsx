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
import { fetcher } from "../utils/fetcher";

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
  zoom: number;
  centerUpdated: Boolean;
  setCenterUpdated: any;
}

export const ChangeView: React.FC<MapProps> = ({
  center,
  zoom,
  centerUpdated,
  setCenterUpdated,
}) => {
  const map = useMap();
  map.locate();
  if (!centerUpdated) {
    map.setView(center, zoom);
    setCenterUpdated(true);
  }

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
  const [centerUpdated, setCenterUpdated] = useState<Boolean>(false);
  var lats: Array<number> = [];
  var longs: Array<number> = [];

  const { data: zoomLevel, error: _buttonsError } = useSWR(
    `https://ach4l.pythonanywhere.com/covifind/zoom/${id}`,
    fetcher
  );

  const [positions, setPositions] = useState();

  const { selctedButton } = useSelectedButton();

  const { data: mapData, error: _mapError } = useSWR(
    `https://ach4l.pythonanywhere.com/covifind/${id}`,
    fetcher
  );

  const getZoomLevel = (place: string) => {
    if (place === "state") {
      return 7;
    } else {
      return 10;
    }
  };

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
        } else if (selctedButton === Options.Oxygen) {
          if (position["Available_Oxy"] > 0) {
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
      <ChangeView
        centerUpdated={centerUpdated}
        setCenterUpdated={setCenterUpdated}
        center={[current.lat, current.lng]}
        zoom={getZoomLevel(zoomLevel)}
      />
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
