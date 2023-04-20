import { createContext, useState } from "react";

export const RouteContext = createContext({
  startLocation: null,
  setStartLocation: (location) => {},
  endLocation: null,
  setEndLocation: (location) => {},
});

function RouteContextProvider({ children }) {
  const [startLoc, setStartLoc] = useState();
  const [endLoc, setEndLoc] = useState();

  function setStartLocation(location) {
    setStartLoc(() => {
      return {
        name: location.name,
        lon: location.lon,
        lat: location.lat,
        type: location.type,
      };
    });
  }

  function setEndLocation(location) {
    setEndLoc(() => {
      return {
        name: location.name,
        lon: location.lon,
        lat: location.lat,
        type: location.type,
      };
    });
  }

  const value = {
    startLocation: startLoc,
    setStartLocation: setStartLocation,
    endLocation: endLoc,
    setEndLocation: setEndLocation,
  };

  return (
    <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
  );
}

export default RouteContextProvider;
