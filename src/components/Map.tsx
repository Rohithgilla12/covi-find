import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import useSWR from "swr";
// import { useSelectedButton } from "../context/ButtonSelection";

const containerStyle = {
  width: "100vw",
  height: "80vh",
};

export const MapComponent = () => {
  const [current, setCurrent] = useState({ lat: 18.4264677, lng: 79.1339878 });
  // const [response, setResponse] = useState({});
  const [selectedCenter, setSelectedCenter] = useState<any | null>(null);
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
    if ("geolocation" in navigator) {
      // navigator.geolocation.getCurrentPosition(async function (position) {
      // setCurrent({
      //   lat: position.coords.latitude,
      //   lng: position.coords.longitude,
      // });
      // });
    }
  }, []);

  useEffect(() => {
    getCenterPoint();
  }, [mapData]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={current} zoom={12}>
        {/* <Marker position={current} /> */}
        {mapData &&
          Object.entries(mapData).map((key: any, value: any) => {
            const position = key[1];
            return (
              <Marker
                key={value}
                position={{
                  lat: position["Lat"],
                  lng: position["Long"],
                }}
                icon="/icu-bed.png"
                onClick={() => {
                  setSelectedCenter({
                    lat: position["Lat"],
                    lng: position["Long"],
                    id: value,
                    ...position,
                  });
                }}
              ></Marker>
            );
          })}
        {selectedCenter && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedCenter(null);
            }}
            position={{
              lat: selectedCenter.lat,
              lng: selectedCenter.lng,
            }}
          >
            <div style={{ color: "black" }}>
              <div>{selectedCenter["Hosp_name"]}</div>
              <div>{selectedCenter["Govt"]}</div>
              <div>Lasted updated at {selectedCenter["Last_updated"]}</div>
              <div>Vacant ICU Beds {selectedCenter["Vacant_ICU_beds"]}</div>
              <div>
                Vacant Normal beds {selectedCenter["Vacant_normal_beds"]}
              </div>
              <div style={{ color: "blue" }}>
                <a href={`tel:${selectedCenter["Contact"].split(";")[0]}`}>
                  Contact {selectedCenter["Contact"]}
                </a>
              </div>
              <div style={{ color: "blue" }}>
                <a href={createNavLink(selectedCenter.lat, selectedCenter.lng)}>
                  Directions{" "}
                </a>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};
