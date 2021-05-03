import { createContext, useContext } from "react";

export enum Options {
  Hospitals = "HOSPITALS",
  IcuBeds = "ICU_BEDS",
  Beds = "BEDS",
  Venilator = "VENTILATORS",
  Oxygen = "OXYGEN",
}

export type SelectedButtonContextType = {
  selctedButton: Options;
  setSelection: (Options: Options) => void;
};

export const SelectedButtonContext = createContext<SelectedButtonContextType>({
  selctedButton: Options.Hospitals,
  setSelection: (_option) => console.warn("no theme provider"),
});

export const useSelectedButton = () => useContext(SelectedButtonContext);
