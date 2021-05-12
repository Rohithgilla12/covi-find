import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Options, useSelectedButton } from "../context/ButtonSelection";

interface RenderMarkersProps {
  positions: any;
}

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

const getMarker = (
  position: any
): L.Icon<L.IconOptions> | L.DivIcon | undefined => {
  const { selctedButton } = useSelectedButton();
  var count: number = -1;

  if (selctedButton === Options.Oxygen) {
    count = position["Available_Oxy"];
  } else if (selctedButton === Options.Beds) {
    count = position["Available_Gen"];
  } else if (selctedButton === Options.Venilator) {
    count = position["Available_Venti"];
  } else if (selctedButton === Options.IcuBeds) {
    count = position["Available_ICU"];
  }

  var icon: string = "/icu-bed.png";
  if (count <= 2 && count > 0) {
    icon = "/markers/red.png";
  } else if (count > 2 && count <= 6) {
    icon = "/markers/orange.png";
  } else if (count >= 7 && count <= 10) {
    icon = "/markers/yellow.png";
  } else if (count > 10) {
    icon = "/markers/green.png";
  }

  return L.icon({
    iconUrl: icon,
    iconSize: [16, 16],
    iconAnchor: [10, 16],
    popupAnchor: [1, -16],
  });
};

export const RenderMarkers: React.FC<RenderMarkersProps> = ({ positions }) => {
  return (
    <>
      {Object.entries(positions).map((key: any, value: any) => {
        const position = key[1];
        return (
          <Marker
            icon={getMarker(position)}
            key={value}
            position={{
              lat: position["lat"],
              lng: position["long"],
            }}
          >
            <Popup minWidth={90}>
              <div style={{ color: "black" }}>
                <div>{position["Hosp_name"]}</div>
                {position["Available_ICU"] !== undefined ? (
                  <div>Vacant ICU Beds {position["Available_ICU"]}</div>
                ) : (
                  <div></div>
                )}
                {position["Available_Gen"] !== undefined ? (
                  <div>Vacant Normal beds {position["Available_Gen"]}</div>
                ) : (
                  <div></div>
                )}
                {position["Available_Venti"] !== undefined ? (
                  <div>
                    Vacant Ventilator beds {position["Available_Venti"]}
                  </div>
                ) : (
                  <div></div>
                )}
                {position["Available_Oxy"] !== undefined ? (
                  <div>Vacant Oxygen beds {position["Available_Oxy"]}</div>
                ) : (
                  <div></div>
                )}
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
