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
import { Box, Center, Text } from "@chakra-ui/react";
import Image from "next/image";

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
interface ChangeViewProps {
  center: any;
  locateMe: Boolean;
  zoom: number;
  centerUpdated: Boolean;
  setCenterUpdated: any;
  setLocateMe: any;
}

export const ChangeView: React.FC<ChangeViewProps> = ({
  center,
  zoom,
  centerUpdated,
  setCenterUpdated,
  locateMe,
  setLocateMe,
}) => {
  const [position, setPosition] = useState<LatLng>();
  const map = useMap();

  if (locateMe) {
    map.locate();
    navigator.geolocation.getCurrentPosition(async function (position) {
      map.flyTo(
        {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        10
      );
    });
    setLocateMe(false);
  }

  useMapEvents({
    locationfound(e) {
      if (e) {
        setPosition(e.latlng);
      }
    },
  });
  if (!centerUpdated) {
    map.flyTo(center, zoom);
    setCenterUpdated(true);
  }
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
  const [current, setCurrent] = useState({ lat: 0, lng: 0 });
  const [centerUpdated, setCenterUpdated] = useState<Boolean>(false);
  const [locateMe, setLocateMe] = useState<Boolean>(false);

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

  if (current.lat === 0) {
    return (
      <Center>
        <Text mt={"40vh"} color="black" size="md">
          Loading the map please wait.
        </Text>
      </Center>
    );
  }
  return (
    <MapContainer
      style={containerStyle}
      center={[current.lat, current.lng]}
      zoom={8}
      zoomControl={false}
    >
      <ChangeView
        locateMe={locateMe}
        centerUpdated={centerUpdated}
        setCenterUpdated={setCenterUpdated}
        center={[current.lat, current.lng]}
        zoom={getZoomLevel(zoomLevel)}
        setLocateMe={setLocateMe}
      />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {positions && <RenderMarkers positions={positions} />}
      <Box
        onClick={() => {
          setLocateMe(!locateMe);
        }}
        zIndex={510}
        position="absolute"
        bottom="2"
        right="2"
        background="#E5dfdf"
        p={1}
        borderRadius="full"
      >
        <Image
          src="/images/location.png"
          alt={"location"}
          height={36}
          width={36}
        />
      </Box>
    </MapContainer>
  );
};

export default MapComponent;
