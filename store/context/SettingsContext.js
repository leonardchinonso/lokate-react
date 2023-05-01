import { createContext, useState } from "react";
import {
  AppearanceConstants,
  PrecisionConstants,
  STORAGE,
} from "../../models/constants";
import {
  setAppearanceDataInStorage,
  setPrecisionDataInStorage,
} from "../on_device/main";

// SettingsContext is the context for saving user settings data
export const SettingsContext = createContext({
  appAppearance: AppearanceConstants.LightMode,
  appPrecision: PrecisionConstants.Approximate,
  setAppAppearance: (appearance) => {},
  setAppPrecision: (precision) => {},
});

// SettingsContextProvider exposes the interface for the user settings functions
function SettingsContextProvider({ children }) {
  // create a state to handle setting the application appearance
  const [appearance, setAppearance] = useState(AppearanceConstants.LightMode);

  // create a state to handle setting the application precision
  const [precision, setPrecision] = useState(PrecisionConstants.Approximate);

  // setAppearanceHandler handles setting the appearance state
  function setAppearanceHandler(appearance) {
    setAppearance(appearance);
    // save the set appearance to the on device storage
    setAppearanceDataInStorage(appearance, STORAGE);
  }

  // setPrecisionHandler handles setting the precision state
  function setPrecisionHandler(precision) {
    setPrecision(precision);
    // save the set precision to the on device storage
    setPrecisionDataInStorage(precision, STORAGE);
  }

  // build the value props for the context wrapper
  const value = {
    appAppearance: appearance,
    appPrecision: precision,
    setAppAppearance: setAppearanceHandler,
    setAppPrecision: setPrecisionHandler,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsContextProvider;
