import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface RenderMarkersProps {
  positions: any;
}

const customMarker = L.icon({
  iconUrl: "/icu-bed.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

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

export const RenderMarkers: React.FC<RenderMarkersProps> = ({ positions }) => {
  return (
    <>
      {Object.entries(positions).map((key: any, value: any) => {
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
    </>
  );
};
