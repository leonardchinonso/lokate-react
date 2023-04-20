import { createContext, useState } from "react";
import {
  AppearanceConstants,
  ConfigConstants,
  PrecisionConstants,
} from "../../models/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    AsyncStorage.setItem(ConfigConstants.StorageAppAppearance, appearance);
  }

  // setPrecisionHandler handles setting the precision state
  function setPrecisionHandler(precision) {
    setPrecision(precision);
    // save the set precision to the on device storage
    AsyncStorage.setItem(ConfigConstants.StorageAppPrecision, precision);
  }

  const value = {
    appearance: appearance,
    precision: precision,
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
