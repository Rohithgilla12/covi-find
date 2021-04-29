import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface RenderMarkersProps {
  positions: any;
}

const customMarker = L.icon({
  iconUrl: "/icu-bed.png",
  iconSize: [32, 32],
  iconAnchor: [10, 32],
  popupAnchor: [2, -32],
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
              lat: position["lat"],
              lng: position["long"],
            }}
          >
            <Popup minWidth={90}>
              <div style={{ color: "black" }}>
                <div>{position["Hosp_name"]}</div>
                <div>{position["Govt"]}</div>
                <div>Vacant ICU Beds {position["Available_ICU"]}</div>
                <div>Vacant Normal beds {position["Available_Gen"]}</div>
                <div>Vacant Venilator beds {position["Available_Venti"]}</div>
                {position["Contact"] && (
                  <div style={{ color: "blue" }}>
                    <a href={`tel:${position["Contact"].split(";")[0]}`}>
                      Contact {position["Contact"]}
                    </a>
                  </div>
                )}
                <div style={{ color: "blue" }}>
                  <a href={createNavLink(position["lat"], position["long"])}>
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
