import { createContext, useState } from "react";

// RouteContext holds all information about the route locations
export const RouteContext = createContext({
  startLocation: null,
  setStartLocation: (location) => {},
  endLocation: null,
  setEndLocation: (location) => {},
});

// RouteContextProvider is the wrapper for the RouteContext
function RouteContextProvider({ children }) {
  // create a state for the start location
  const [startLoc, setStartLoc] = useState();

  // create a state for the end location
  const [endLoc, setEndLoc] = useState();

  // setStartLocation handles setting the start location state
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

  // setEndLocation handles setting the end location state
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

  // value is the prop to be passed when rendering child components
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
