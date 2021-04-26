import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
// import { useSelectedButton } from "../context/ButtonSelection";

const containerStyle = {
  width: "100vw",
  height: "80vh",
};

export const MapComponent = () => {
  const [current, setCurrent] = useState({ lat: 18.4264677, lng: 79.1339878 });
  const [response, setResponse] = useState({});
  const [selectedCenter, setSelectedCenter] = useState<any | null>(null);
  // const { selctedButton } = useSelectedButton();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        setCurrent({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        const res = await axios.post(
          "https://ach4l.pythonanywhere.com/findhosp",
          {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          }
        );
        setResponse(res.data);
      });
    }
  }, []);
  console.log(response);
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={current} zoom={4}>
        <Marker position={current} />
        {Object.entries(response).map((key: any, value: any) => {
          const position = key[1];
          console.log(position);
          return (
            <Marker
              key={value}
              position={{
                lat: position["Lat"],
                lng: position["Long"],
              }}
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
              <div>Total ICU Beds {selectedCenter["Total_ICU_beds"]}</div>
              <div>Total Normal Beds {selectedCenter["Total_normal_beds"]}</div>
              <div>Vacant Beds {selectedCenter["Vacant_ICU_beds"]}</div>
              <div>
                Vacant Normal beds {selectedCenter["Vacant_normal_beds"]}
              </div>
              <div>
                <a href={`tel:${selectedCenter["Contact"].split(";")[0]}`}>
                  Contact {selectedCenter["Contact"]}
                </a>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};
